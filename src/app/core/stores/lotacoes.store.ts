import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { Lotacao }
from '../models/lotacao.model';

import { LotacoesService }
from '../services/lotacoes.service';

@Injectable({
  providedIn: 'root'
})
export class LotacoesStore {

  constructor(

    private readonly service:
      LotacoesService

  ) {}

  private readonly _lotacoes =
    signal<Lotacao[]>([]);

  readonly lotacoes =
    this._lotacoes.asReadonly();

  readonly lotacoesAtivas =
    computed(() =>

      this._lotacoes()

        .filter(

          lotacao =>
            lotacao.ativo

        )

    );

  async carregar():
    Promise<void> {

    const lotacoes =

      await this.service
        .listar();

    this._lotacoes.set(
      lotacoes
    );
  }

  async adicionar(
    lotacao: Lotacao
  ): Promise<void> {

    await this.service
      .criar(lotacao);

    this._lotacoes.update(

      lotacoes => [
        ...lotacoes,
        lotacao
      ]

    );
  }

  encerrar(
    id: string
  ): void {

    this._lotacoes.update(

      lotacoes =>

        lotacoes.map(

          lotacao =>

            lotacao.id === id

              ? {
                  ...lotacao,
                  ativo: false
                }

              : lotacao

        )

    );
  }

}