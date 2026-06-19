import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { Guarda } from '../models/guarda.model';

import { GuardasApiService } from '../services/guardas-api.service';

@Injectable({
  providedIn: 'root'
})
export class GuardasStore {

  constructor(
    private readonly service: GuardasApiService
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
  Carregar da API REST.
  */
  async carregar(): Promise<void> {
    const guardas =
      await this.service.listar();

    this._guardas.set(guardas);
  }

  /*
    Adicionar guarda e recarregar lista.
  */
  async adicionar(
    guarda: Guarda
  ): Promise<void> {

    await this.service.criar(guarda);

    await this.carregar();
  }

  /*
    Atualizar guarda e recarregar lista.
  */
  async atualizar(
    guarda: Guarda
  ): Promise<void> {

    await this.service.atualizar(guarda);

    await this.carregar();
  }

  /*
    Remover guarda e recarregar lista.
  */
  async remover(
    id: string
  ): Promise<void> {

    await this.service.remover(id);

    await this.carregar();
  }

  /*
    Buscar por ID.
  */
  buscarPorId(
    id: string
  ): Guarda | undefined {

    return this._guardas()
      .find(
        guarda =>
          guarda.id === id
      );
  }

  /*
    Buscar por matrícula.
  */
  buscarPorMatricula(
    matricula: string
  ): Guarda | undefined {

    return this._guardas()
      .find(
        guarda =>
          guarda.matricula === matricula
      );
  }

}