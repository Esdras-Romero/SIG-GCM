import { Component, OnInit, signal, computed } from '@angular/core';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { GerarEscalaRequest, Escala } from '../../../../core/models/escala.model';
import { UltimaEscalaResponse } from '../../../../core/models/ultima-escala.model';

import { PostosStore } from '../../../../core/stores/postos.store';
import { EscalasStore } from '../../../../core/stores/escalas.store';

@Component({
  selector: 'app-gerar-escala',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './gerar-escala.html'
})
export class GerarEscalaComponent implements OnInit {

  loading = signal(false);
  consultandoUltimaEscala = signal(false);
  mensagemErro = signal('');
  escalaGerada = signal<Escala | null>(null);
  ultimaEscala = signal<UltimaEscalaResponse | null>(null);

 request: GerarEscalaRequest = {
  postoId: '',
  mes: new Date().getMonth() + 1,
  ano: new Date().getFullYear(),
  grupoInicial: 'A'
};

  constructor(
    public readonly postosStore: PostosStore,
    private readonly escalasStore: EscalasStore,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.postosStore.carregar();

    console.log(
      'POSTOS CARREGADOS:',
      this.postosStore.postos()
    );
  }

  async gerar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');
      this.escalaGerada.set(null);

      if (!this.request.postoId) {
        this.mensagemErro.set('Selecione um posto.');
        return;
      }

      const escala =
        await this.escalasStore.gerar(this.request);

      this.escalaGerada.set(escala);

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao gerar escala.');
    } finally {
      this.loading.set(false);
    }
  }

  async voltarParaLista(): Promise<void> {
    await this.router.navigate(['/escalas']);
  }

  async aoSelecionarPosto(): Promise<void> {

    this.ultimaEscala.set(null);

    if (!this.request.postoId) {
      return;
    }

    try {

      this.consultandoUltimaEscala.set(true);

      const ultima =
        await this.escalasStore.buscarUltimaEscala(
          this.request.postoId
        );

      this.ultimaEscala.set(ultima);

      if (ultima.possuiEscalaAnterior) {

        this.request.grupoInicial =
          ultima.grupoSugerido;

      }

    } catch (error) {

      console.error(error);

      this.mensagemErro.set(
        'Erro ao consultar a última escala.'
      );

    } finally {

      this.consultandoUltimaEscala.set(false);

    }

  }

  readonly tipoEscalaSelecionada = computed(() => {

    const posto = this.postosStore
      .postos()
      .find(p => p.id === this.request.postoId);

    return posto?.tipoEscala;
  });

  readonly gruposDisponiveis = computed(() => {

    const tipoEscala = this.tipoEscalaSelecionada();

    if (tipoEscala === '24x120') {
      return ['A', 'B', 'C', 'D', 'E', 'F'];
    }

    if (tipoEscala === '12x60') {
      return ['A', 'B', 'C'];
    }

    return [];
  });

  readonly primeiraEscala = computed(() => {

    const ultima = this.ultimaEscala();

    if (!ultima) {
      return true;
    }

    return !ultima.possuiEscalaAnterior;

  });
}