import { Injectable } from '@angular/core';

import { Posto } from '../../../core/models/posto.model';
import { PostosStore } from '../../../core/stores/postos.store';

@Injectable({
  providedIn: 'root'
})
export class PostoFacade {

  constructor(
    private readonly store: PostosStore
  ) {}

  get postos() {
    return this.store.postos;
  }

  get totalPostos() {
    return this.store.totalPostos;
  }

  async carregar(): Promise<void> {
    await this.store.carregar();
  }

  async adicionar(posto: Posto): Promise<void> {
    await this.store.adicionar(posto);
  }

  async atualizar(posto: Posto): Promise<void> {
    await this.store.atualizar(posto);
  }

  async remover(id: string): Promise<void> {
    await this.store.remover(id);
  }

  buscarPorId(id: string): Posto | undefined {
    return this.store.buscarPorId(id);
  }
}