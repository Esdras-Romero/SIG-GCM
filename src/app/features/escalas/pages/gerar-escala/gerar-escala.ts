import { Component, OnInit, signal } from '@angular/core';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { GerarEscalaRequest, Escala } from '../../../../core/models/escala.model';

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
  mensagemErro = signal('');
  escalaGerada = signal<Escala | null>(null);

  request: GerarEscalaRequest = {
    postoId: '',
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear(),
    tipoEscala: '24x120',
    grupoInicial: 'A',
    grupoInicialDia: 'A',
    grupoInicialNoite: 'A'
  };

  constructor(
    public readonly postosStore: PostosStore,
    private readonly escalasStore: EscalasStore,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.postosStore.carregar();
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
}