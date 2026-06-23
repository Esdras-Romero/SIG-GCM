import { Component, OnInit, signal, computed } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { Lotacao } from '../../../../core/models/lotacao.model';

import { LotacaoFacade } from '../../state/lotacao.facade';
import { GuardaFacade } from '../../../guardas/state/guarda.facade';
import { PostoFacade } from '../../../postos/state/posto.facade';

@Component({
  selector: 'app-editar-lotacao',
  standalone: true,
  imports: [ FormsModule, RouterLink ],
  templateUrl: './editar-lotacao.html'
})
export class EditarLotacaoComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  lotacao: Lotacao = {
    id: '',
    guardaId: '',
    postoId: '',
    ativo: true,
    grupo: 'A',
    turno: 'DIA'
  };

  gruposDisponiveis: string[] = [];
  turnosDisponiveis: string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly lotacaoFacade: LotacaoFacade,
    public readonly guardaFacade: GuardaFacade,
    public readonly postoFacade: PostoFacade
  ) {}

  readonly guardasDisponiveis = computed(() => {

    const guardas = this.guardaFacade.guardas();

    const guardasLotados = new Set(
      this.lotacaoFacade.lotacoes()
          .filter(lotacao => lotacao.ativo && lotacao.id !== this.lotacao.id)
          .map(lotacao => lotacao.guardaId)
    );

    return guardas.filter(
      guarda => !guardasLotados.has(guarda.id)
    );
  });

  async ngOnInit(): Promise<void> {
    try {
      this.loading.set(true);

      await Promise.all([
        this.lotacaoFacade.carregar(),
        this.guardaFacade.carregar(),
        this.postoFacade.carregar()
      ]);

      const id =
        this.route.snapshot.paramMap.get('id');

      if (!id) {
        this.mensagemErro.set(
          'Lotação não encontrada.'
        );
        return;
      }

      const lotacaoEncontrada =
        this.lotacaoFacade.buscarPorId(id);

      if (!lotacaoEncontrada) {
        this.mensagemErro.set(
          'Lotação não encontrada.'
        );
        return;
      }

      this.lotacao = { ...lotacaoEncontrada };
      this.atualizarCamposDisponiveis();

    } catch (error) {
      console.error(error);

      this.mensagemErro.set(
        'Erro ao carregar lotação.'
      );

    } finally {
      this.loading.set(false);
    }
  }

  async salvar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      await this.lotacaoFacade.atualizar(this.lotacao);

      await this.router.navigate([
        '/lotacoes'
      ]);

    } catch (error) {
      console.error(error);

      this.mensagemErro.set(
        'Erro ao atualizar lotação.'
      );

    } finally {
      this.loading.set(false);
    }
  }

  atualizarCamposDisponiveis(): void {
    const posto = this.postoFacade.postos()
                      .find(p => p.id === this.lotacao.postoId);
      
    this.gruposDisponiveis = [];
    this.turnosDisponiveis = [];

    if (!posto) return;

    if (posto.tipoEscala == '24x120') {
      this.gruposDisponiveis = ['A', 'B', 'C', 'D', 'E', 'F'];
    } else if (posto.tipoEscala === '12x60') {
      this.gruposDisponiveis = ['A', 'B', 'C'];
      this.turnosDisponiveis = ['DIA', 'NOITE'];
    } else if (posto.tipoEscala === 'ADMINISTRATIVO') {
      this.turnosDisponiveis = ['MANHA', 'TARDE'];
    }
  }
}