import { Injectable, signal, computed } from '@angular/core';

import { Escala, GerarEscalaRequest } from '../models/escala.model';

import { EscalasApiService } from '../services/escalas-api.service';

import { UltimaEscalaResponse } from '../models/ultima-escala.model';

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

  async buscarUltimaEscala(
    postoId: string
  ): Promise<UltimaEscalaResponse> {

    return await this.service.buscarUltimaEscala(
      postoId
    );
  }

  async baixarPdf(id: string): Promise<void> {
    const blob = await this.service.baixarPdf(id);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `escala-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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