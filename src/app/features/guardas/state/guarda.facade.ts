import { Injectable }
from '@angular/core';

import { Guarda }
from '../../../core/models/guarda.model';

import { GuardasStore }
from '../../../core/stores/guardas.store';

@Injectable({
  providedIn: 'root'
})
export class GuardaFacade {

  constructor(

    private readonly store:
      GuardasStore

  ) {}

  /*
    SIGNALS
  */

  get guardas() {

    return this.store.guardas;
  }

  get totalGuardas() {

    return this.store.totalGuardas;
  }

  /*
    ACTIONS
  */

  async carregar():
    Promise<void> {

    await this.store
      .carregar();
  }

  async adicionar(
    guarda: Guarda
  ): Promise<void> {

    await this.store
      .adicionar(guarda);
  }

  async remover(
    id: string
  ): Promise<void> {

    await this.store
      .remover(id);
  }

  async atualizar(guarda: Guarda): Promise<void> {
    await this.store.atualizar(guarda);
  }

  buscarPorId(id: string): Guarda | undefined {
    return this.store.buscarPorId(id);
  }

}