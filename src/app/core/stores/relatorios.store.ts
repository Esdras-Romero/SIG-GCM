import { Injectable, signal } from '@angular/core';

import { RelatorioResumo, RelatorioEscalaTipo, RelatoriosApiService } from '../services/relatorio-api.service';

@Injectable
({ providedIn: 'root' })
export class RelatoriosStore {

  constructor(
    private readonly service: RelatoriosApiService
  ) {}

  private readonly _resumo =
    signal<RelatorioResumo | null>(null);

  private readonly _escalasPorTipo =
    signal<RelatorioEscalaTipo[]>([]);

  readonly resumo =
    this._resumo.asReadonly();

  readonly escalasPorTipo =
    this._escalasPorTipo.asReadonly();

  async carregarResumo(): Promise<void> {

    const resumo =
      await this.service.resumo();

    this._resumo.set(resumo);
  }

  async carregarEscalasPorTipo(): Promise<void> {

    const dados =
      await this.service.escalasPorTipo();

    this._escalasPorTipo.set(dados);
  }
}