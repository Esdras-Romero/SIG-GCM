import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import {
  Escala,
  GerarEscalaRequest
} from '../models/escala.model';

import { EscalasApiService } from '../services/escalas-api.service';

@Injectable({
  providedIn: 'root'
})
export class EscalasStore {

  constructor(
    private readonly service: EscalasApiService
  ) {}

  private readonly _escalas =
    signal<Escala[]>([]);

  readonly escalas =
    this._escalas.asReadonly();

  readonly totalEscalas =
    computed(() =>
      this._escalas().length
    );

  async carregar(): Promise<void> {

    const escalas =
      await this.service.listar();

    this._escalas.set(escalas);
  }

  async gerar(
    request: GerarEscalaRequest
  ): Promise<Escala> {

    const escala =
      await this.service.gerar(request);

    await this.carregar();

    return escala;
  }

  buscarPorId(
    id: string
  ): Escala | undefined {

    return this._escalas()
      .find(
        escala =>
          escala.id === id
      );
  }
}