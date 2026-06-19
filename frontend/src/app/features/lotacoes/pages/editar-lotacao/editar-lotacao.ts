import { Component, OnInit, signal } from '@angular/core';

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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly lotacaoFacade: LotacaoFacade,
    public readonly guardaFacade: GuardaFacade,
    public readonly postoFacade: PostoFacade
  ) {}

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

      this.lotacao = {
        ...lotacaoEncontrada
      };

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
}