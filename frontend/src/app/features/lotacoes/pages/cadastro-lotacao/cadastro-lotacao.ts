import { Component, OnInit, signal } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Lotacao } from '../../../../core/models/lotacao.model';

import { LotacaoFacade } from '../../state/lotacao.facade';
import { GuardaFacade } from '../../../guardas/state/guarda.facade';
import { PostoFacade } from '../../../postos/state/posto.facade';

@Component({
  selector: 'app-cadastro-lotacao',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro-lotacao.html'
})
export class CadastroLotacaoComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  lotacao: Lotacao = {
    id: crypto.randomUUID(),
    guardaId: '',
    postoId: '',
    ativo: true,
    grupo: 'A',
    turno: 'DIA'
  };

  constructor(
    private readonly lotacaoFacade: LotacaoFacade,
    public readonly guardaFacade: GuardaFacade,
    public readonly postoFacade: PostoFacade,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.guardaFacade.carregar(),
      this.postoFacade.carregar()
    ]);
  }

  async salvar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      if (!this.lotacao.guardaId || !this.lotacao.postoId) {
        this.mensagemErro.set(
          'Informe o guarda e o posto.'
        );
        return;
      }

      await this.lotacaoFacade.adicionar(this.lotacao);

      await this.router.navigate([
        '/lotacoes'
      ]);

    } catch (error) {
      console.error(error);

      this.mensagemErro.set(
        'Erro ao cadastrar lotação.'
      );

    } finally {
      this.loading.set(false);
    }
  }
}
