import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { Posto }
from '../models/posto.model';

import { PostosService }
from '../services/postos.service';

@Injectable({
  providedIn: 'root'
})
export class PostosStore {

  constructor(

    private readonly service:
      PostosService

  ) {}

  private readonly _postos =
    signal<Posto[]>([]);

  readonly postos =
    this._postos.asReadonly();

  readonly totalPostos =
    computed(() =>

      this._postos().length

    );

  async carregar():
    Promise<void> {

    const postos =

      await this.service
        .listar();

    this._postos.set(
      postos
    );
  }

  async adicionar(
    posto: Posto
  ): Promise<void> {

    await this.service
      .criar(posto);

    this._postos.update(

      postos => [
        ...postos,
        posto
      ]

    );
  }

  remover(
    id: string
  ): void {

    this._postos.update(

      postos =>

        postos.filter(

          posto =>
            posto.id !== id

        )

    );
  }

}