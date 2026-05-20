import { Injectable } from '@angular/core';

import { GUARDAS_SEED } from '../seeds/guardas.seed';
import { POSTOS_SEED } from '../seeds/postos.seed';
import { FERIADOS_SEED } from '../seeds/feriados.seed';
import { LOTACOES_SEED } from '../seeds/lotacoes.seed';

import { GuardasService } from './guardas.service';
import { PostosService } from './postos.service';
import { FeriadoService } from './feriado.service';
import { LotacoesService } from './lotacoes.service';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(
    private readonly guardasService: GuardasService,
    private readonly postosService: PostosService,
    private readonly feriadoService: FeriadoService,
    private readonly lotacoesService: LotacoesService
  ) {}

  async executar(): Promise<void> {
    await this.inserirGuardas();
    await this.inserirPostos();
    await this.inserirFeriados();
    await this.inserirLotacoes();
  }

  private async inserirGuardas(): Promise<void> {
    for (const guarda of GUARDAS_SEED) {
      await this.guardasService.criar(guarda);
    }
  }

  private async inserirPostos(): Promise<void> {
    for (const posto of POSTOS_SEED) {
      await this.postosService.criar(posto);
    }
  }

  private async inserirFeriados(): Promise<void> {
    for (const feriado of FERIADOS_SEED) {
      await this.feriadoService.criar(feriado);
    }
  }

  private async inserirLotacoes(): Promise<void> {
    for (const lotacao of LOTACOES_SEED) {
      await this.lotacoesService.criar(lotacao);
    }
  }
}