import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { Guarda }
from '../models/guarda.model';

import { GuardasService }
from '../services/guardas.service';

@Injectable({
  providedIn: 'root'
})
export class GuardasStore {

  constructor(

    private readonly service:
      GuardasService

  ) {}

  /*
    Estado principal.
  */
  private readonly _guardas =
    signal<Guarda[]>([]);

  /*
    Estado somente leitura.
  */
  readonly guardas =
    this._guardas.asReadonly();

  /*
    Quantidade total.
  */
  readonly totalGuardas =
    computed(() =>

      this._guardas().length

    );

  /*
    Carregar do Supabase.
  */
  async carregar():
    Promise<void> {

    const guardas =

      await this.service
        .listar();

    this._guardas.set(
      guardas
    );
  }

  /*
    Adicionar.
  */
  async adicionar(
    guarda: Guarda
  ): Promise<void> {

    await this.service
      .criar(guarda);

    this._guardas.update(

      guardas => [
        ...guardas,
        guarda
      ]

    );
  }

  /*
    Remover.
  */
  async remover(
    id: string
  ): Promise<void> {

    await this.service
      .remover(id);

    this._guardas.update(

      guardas =>

        guardas.filter(

          guarda =>
            guarda.id !== id

        )

    );
  }

  /*
    Buscar matrícula.
  */
  buscarPorMatricula(
    matricula: string
  ): Guarda | undefined {

    return this._guardas()

      .find(

        guarda =>

          guarda.matricula ===
          matricula

      );
  }

}