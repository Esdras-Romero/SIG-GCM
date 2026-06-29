import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Lotacao } from '../../../../core/models/lotacao.model';
import { Posto } from '../../../../core/models/posto.model';

import { LotacaoFacade } from '../../state/lotacao.facade';
import { GuardasStore } from '../../../../core/stores/guardas.store';
import { PostosStore } from '../../../../core/stores/postos.store';

@Component({
  selector: 'app-editar-lotacao',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './editar-lotacao.html'
})

export class EditarLotacaoComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  lotacao?: Lotacao; 

  gruposDisponiveis: string[] = [];
  turnosDisponiveis: string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly lotacaoFacade: LotacaoFacade,
    public readonly guardasStore: GuardasStore,
    public readonly postosStore: PostosStore
  ) {}

  readonly guardasDisponiveis = computed(() => {
    if (!this.lotacao) {
      return [];
    }

    const guardas = this.guardasStore.guardas();
    const guardasLotados = new Set(
      this.lotacaoFacade
        .lotacoes()
        .filter(l => l.ativo && l.id !== this.lotacao?.id)
        .map(l => l.guardaId)
    );

    return guardas.filter(
      guarda =>
        guarda.id === this.lotacao?.guardaId ||
        !guardasLotados.has(guarda.id)
    );
  });

  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    this.mensagemErro.set(''); 

    try {
      await Promise.all([
        this.guardasStore.carregar(),
        this.postosStore.carregar(),
        this.lotacaoFacade.carregar()
      ]);

      const id = this.route.snapshot.paramMap.get('id');
      const encontrada = this.lotacaoFacade.lotacoes().find(l => l.id === id);

      if (!encontrada) {
        this.mensagemErro.set('Lotação não encontrada no sistema.');
        return;
      }

      this.lotacao = { ...encontrada };

      this.aoSelecionarPosto();

    } catch (error) {
      console.error('Erro no ngOnInit:', error);
      this.mensagemErro.set('Erro ao carregar os dados de lotação.');
    } finally {
      this.loading.set(false);
    }
  }

  postoSelecionado(): Posto | undefined {
    if (!this.lotacao?.postoId) return undefined;
    
    return this.postosStore
      .postos()
      .find(p => p.id === this.lotacao?.postoId);
  }

  aoSelecionarPosto(): void {
    const posto = this.postoSelecionado();

    this.gruposDisponiveis = [];
    this.turnosDisponiveis = [];

    if (!posto) {
      return;
    }

    if (posto.tipoEscala === '24x120') {
      this.gruposDisponiveis = ['A', 'B', 'C', 'D', 'E', 'F'];
    } else if (posto.tipoEscala === '12x60') {
      this.gruposDisponiveis = ['A', 'B', 'C'];
      this.turnosDisponiveis = ['DIA', 'NOITE'];
    } else if (posto.tipoEscala === 'ADMINISTRATIVO') {
      this.turnosDisponiveis = ['MANHA', 'TARDE'];
    }
  }

  validar(): boolean {
    if (!this.lotacao) {
      this.mensagemErro.set('Dados da lotação não foram carregados.');
      return false;
    }

    const posto = this.postoSelecionado();

    if (!this.lotacao.guardaId || !this.lotacao.postoId) {
      this.mensagemErro.set('Selecione um guarda e um posto.');
      return false;
    }

    if (!posto) {
      this.mensagemErro.set('Posto inválido.');
      return false;
    }

    if (posto.tipoEscala === '24x120' && !this.lotacao.grupo) {
      this.mensagemErro.set('Selecione o grupo.');
      return false;
    }

    if (
      posto.tipoEscala === '12x60' &&
      (!this.lotacao.grupo || !this.lotacao.turno)
    ) {
      this.mensagemErro.set('Selecione o grupo e o turno.');
      return false;
    }

    if (
      posto.tipoEscala === 'ADMINISTRATIVO' &&
      !this.lotacao.turno
    ) {
      this.mensagemErro.set('Selecione o turno.');
      return false;
    }

    return true;
  }

  async salvar(): Promise<void> {

    if (!this.lotacao || !this.validar()) {
      return;
    }

    this.loading.set(true);
    this.mensagemErro.set('');

    try {

      await this.lotacaoFacade.atualizar(this.lotacao);

      await this.router.navigate(['/lotacoes']);

    } catch (error) {

      console.error(error);
      this.mensagemErro.set('Erro ao atualizar lotação.');

    } finally {

      this.loading.set(false);

    }
  }
}