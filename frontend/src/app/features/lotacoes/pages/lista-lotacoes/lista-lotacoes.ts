import { Component, OnInit, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

import { LotacaoFacade } from '../../state/lotacao.facade';
import { GuardaFacade } from '../../../guardas/state/guarda.facade';
import { PostoFacade } from '../../../postos/state/posto.facade';

@Component({
  selector: 'app-lista-lotacoes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista-lotacoes.html'
})
export class ListaLotacoesComponent implements OnInit {

  loading = signal(false);
  mensagem = signal('');

  constructor(
    public readonly lotacaoFacade: LotacaoFacade,
    public readonly guardaFacade: GuardaFacade,
    public readonly postoFacade: PostoFacade
  ) {}

  async ngOnInit(): Promise<void> {
    await this.carregar();
  }

  async carregar(): Promise<void> {
    try {
      this.loading.set(true);

      await Promise.all([
        this.lotacaoFacade.carregar(),
        this.guardaFacade.carregar(),
        this.postoFacade.carregar()
      ]);

    } finally {
      this.loading.set(false);
    }
  }

  nomeGuarda(guardaId: string): string {
    return this.guardaFacade
    .guardas()
    .find(guarda => guarda.id === guardaId)
    ?.nome ?? 'Guarda não encontrado';
  }

  nomePosto(postoId: string): string {
    return this.postoFacade
    .postos()
    .find(posto => posto.id === postoId)
    ?.nome ?? 'Posto não encontrado';
  }

  obterEscalaPosto(postoId: string): string {
    return this.postoFacade
      .postos()
      .find(p => p.id === postoId)
      ?.tipoEscala ?? '';
  }

  async remover(id: string): Promise<void> {
    const confirmar = confirm('Deseja realmente remover esta lotação?');

    if (!confirmar) {
      return;
    }

    try {
      await this.lotacaoFacade.remover(id);

      this.mensagem.set(
        'Lotação removida com sucesso.'
      )
    } catch (error) {
      console.error(error);

      this.mensagem.set(
        'Erro ao remover lotação.'
      );
    }
  }
}
