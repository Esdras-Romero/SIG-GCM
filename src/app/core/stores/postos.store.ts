import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { Posto } from '../models/posto.model';
import { PostosApiService } from '../services/postos-api.service';

@Injectable({
  providedIn: 'root'
})
export class PostosStore {

  constructor(
    private readonly service: PostosApiService
  ) {}

  private readonly _postos =
    signal<Posto[]>([]);

  readonly postos =
    this._postos.asReadonly();

  readonly totalPostos =
    computed(() => this._postos().length);

  async carregar(): Promise<void> {
    const postos =
      await this.service.listar();

    this._postos.set(postos);
  }

  async adicionar(posto: Posto): Promise<void> {
    await this.service.criar(posto);
    await this.carregar();
  }

  async atualizar(posto: Posto): Promise<void> {
    await this.service.atualizar(posto);
    await this.carregar();
  }

  async remover(id: string): Promise<void> {
    await this.service.remover(id);
    await this.carregar();
  }

  buscarPorId(id: string): Posto | undefined {
    return this._postos()
      .find(posto => posto.id === id);
  }
}