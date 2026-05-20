import { Injectable }
from '@angular/core';

import { Lotacao }
from '../../../core/models/lotacao.model';

import { LotacoesStore }
from '../../../core/stores/lotacoes.store';

@Injectable({
  providedIn: 'root'
})
export class LotacaoFacade {

  constructor(

    private readonly store:
      LotacoesStore

  ) {}

  get lotacoes() {

    return this.store.lotacoes;
  }

  get lotacoesAtivas() {

    return this.store.lotacoesAtivas;
  }

  async carregar():
    Promise<void> {

    await this.store
      .carregar();
  }

  async adicionar(
    lotacao: Lotacao
  ): Promise<void> {

    await this.store
      .adicionar(lotacao);
  }

}