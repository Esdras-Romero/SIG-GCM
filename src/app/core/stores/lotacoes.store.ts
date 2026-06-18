import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { Lotacao }
from '../models/lotacao.model';

import { LotacoesApiService }
from '../services/lotacoes-api.service';

@Injectable({
  providedIn: 'root'
})
export class LotacoesStore {

  constructor(
    private readonly service: LotacoesApiService
  ) {}

  private readonly _lotacoes =
    signal<Lotacao[]>([]);

  readonly lotacoes =
    this._lotacoes.asReadonly();

  readonly totalLotacoes =
    computed(() =>
      this._lotacoes().length
    );

  readonly lotacoesAtivas =
    computed(() =>
      this._lotacoes()
        .filter(
          lotacao =>
            lotacao.ativo
        )
    );

  async carregar(): Promise<void> {

    const lotacoes =
      await this.service.listar();

    this._lotacoes.set(lotacoes);
  }

  async adicionar(
    lotacao: Lotacao
  ): Promise<void> {

    await this.service.criar(lotacao);

    await this.carregar();
  }

  async atualizar(
    lotacao: Lotacao
  ): Promise<void> {

    await this.service.atualizar(lotacao);

    await this.carregar();
  }

  async remover(
    id: string
  ): Promise<void> {

    await this.service.remover(id);

    await this.carregar();
  }

  async encerrar(
    lotacao: Lotacao
  ): Promise<void> {

    await this.atualizar({
      ...lotacao,
      ativo: false
    });
  }

  buscarPorId(
    id: string
  ): Lotacao | undefined {

    return this._lotacoes()
      .find(
        lotacao =>
          lotacao.id === id
      );
  }
}