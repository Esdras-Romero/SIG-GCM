import { Injectable }
from '@angular/core';

import { EscalaMensal }
from '../../../core/models/escala-mensal.model';

import { EscalasStore }
from '../../../core/stores/escalas.store';

@Injectable({
  providedIn: 'root'
})
export class EscalaFacade {

  constructor(

    private readonly store:
      EscalasStore

  ) {}

  get escalas() {

    return this.store.escalas;
  }

  get totalEscalas() {

    return this.store.totalEscalas;
  }

  async carregar():
    Promise<void> {

    await this.store
      .carregar();
  }

  async adicionar(
    escala: EscalaMensal
  ): Promise<void> {

    await this.store
      .adicionar(escala);
  }

}