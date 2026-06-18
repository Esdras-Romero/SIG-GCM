import { Injectable } from '@angular/core';

import { Lotacao } from '../../../core/models/lotacao.model';
import { LotacoesStore } from '../../../core/stores/lotacoes.store';

@Injectable({
  providedIn: 'root'
})
export class LotacaoFacade {

  constructor(
    private readonly store: LotacoesStore
  ) {}

  get lotacoes() {
    return this.store.lotacoes;
  }

  get totalLotacoes() {
    return this.store.totalLotacoes;
  }

  get lotacoesAtivas() {
    return this.store.lotacoesAtivas;
  }

  async carregar(): Promise<void> {
    await this.store.carregar();
  }

  async adicionar(lotacao: Lotacao): Promise<void> {
    await this.store.adicionar(lotacao);
  }

  async atualizar(lotacao: Lotacao): Promise<void> {
    await this.store.atualizar(lotacao);
  }

  async remover(id: string): Promise<void> {
    await this.store.remover(id);
  }

  async encerrar(lotacao: Lotacao): Promise<void> {
    await this.store.encerrar(lotacao);
  }

  buscarPorId(id: string): Lotacao | undefined {
    return this.store.buscarPorId(id);
  }
}