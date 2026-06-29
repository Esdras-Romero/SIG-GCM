import { Component, OnInit, signal, computed } from '@angular/core';

import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Lotacao } from '../../../../core/models/lotacao.model';
import { Guarda } from '../../../../core/models/guarda.model';
import { Posto } from '../../../../core/models/posto.model';

import { LotacaoFacade } from '../../state/lotacao.facade';
import { GuardasStore } from '../../../../core/stores/guardas.store';
import { PostosStore } from '../../../../core/stores/postos.store';

@Component({
  selector: 'app-cadastro-lotacao',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro-lotacao.html'
})
export class CadastroLotacaoComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  origem = 'lista';

  lotacao: Lotacao = {
    id: crypto.randomUUID(),
    guardaId: '',
    postoId: '',
    ativo: true,
    grupo: undefined,
    turno: undefined
  };

  gruposDisponiveis: string[] = [];
  turnosDisponiveis: string[] = [];

  constructor(
    public readonly guardasStore: GuardasStore,
    public readonly postosStore: PostosStore,
    private readonly lotacaoFacade: LotacaoFacade,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  readonly guardasDisponiveis = computed(() => {

    const guardas = this.guardasStore.guardas();

    const guardasLotados = new Set(
      this.lotacaoFacade.lotacoes()
          .filter(lotacao => lotacao.ativo)
          .map(lotacao => lotacao.guardaId)
    );

    return guardas.filter(
      guarda => !guardasLotados.has(guarda.id)
    );
  });

  async ngOnInit(): Promise<void> {

    this.origem = 
      this.route.snapshot.queryParamMap.get('origem') ?? 'lista';

    await Promise.all([
      this.guardasStore.carregar(),
      this.postosStore.carregar(),
      this.lotacaoFacade.carregar()
    ]);
  }

  voltar(): void {

    if (this.origem === 'dashboard') {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.router.navigate(['/lotacoes']);
  }

  aoSelecionarPosto(): void {
    const posto = this.postoSelecionado();

    this.lotacao.grupo = undefined;
    this.lotacao.turno = undefined;

    this.gruposDisponiveis = [];
    this.turnosDisponiveis = [];

    if (!posto) {
      return;
    }

    if (posto.tipoEscala === '24x120') {
      this.gruposDisponiveis = ['A', 'B', 'C', 'D', 'E', 'F'];
      return;
    }

    else if (posto.tipoEscala === '12x60') {
      this.gruposDisponiveis =  ['A', 'B', 'C'];
      this.turnosDisponiveis = ['DIA', 'NOITE'];
      return;
    }

    else if (posto.tipoEscala ==='ADMINISTRATIVO') {
      this.turnosDisponiveis = ['MANHA', 'TARDE'];
    }    
  }

  postoSelecionado(): Posto | undefined {
    return this.postosStore
      .postos()
      .find(posto => posto.id === this.lotacao.postoId);
  }

  validar(): boolean {
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

    if (posto.tipoEscala === '12x60' && (!this.lotacao.grupo || !this.lotacao.turno)) {
      this.mensagemErro.set('Selecione o grupo e o turno.');
      return false;
    }

    if (posto.tipoEscala === 'ADMINISTRATIVO' && !this.lotacao.turno) {
      this.mensagemErro.set('Selecione o turno.');
      return false;
    }
    return true;
  }

   async salvar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      if (!this.validar()) {
        return;
      }

      await this.lotacaoFacade.adicionar(this.lotacao);

      this.voltar();

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao cadastrar lotação.');
    } finally {
      this.loading.set(false);
    }
  }
}
