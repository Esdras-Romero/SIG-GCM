import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { EscalaMensal }
from '../models/escala-mensal.model';

import { EscalasService }
from '../services/escalas.service';

@Injectable({
  providedIn: 'root'
})
export class EscalasStore {

  constructor(

    private readonly service:
      EscalasService

  ) {}

  private readonly _escalas =
    signal<EscalaMensal[]>([]);

  readonly escalas =
    this._escalas.asReadonly();

  readonly totalEscalas =
    computed(() =>

      this._escalas().length

    );

  async carregar():
    Promise<void> {

    const escalas =

      await this.service
        .listar();

    this._escalas.set(
      escalas
    );
  }

  async adicionar(
    escala: EscalaMensal
  ): Promise<void> {

    await this.service
      .criar(escala);

    this._escalas.update(

      escalas => [
        ...escalas,
        escala
      ]

    );
  }

}