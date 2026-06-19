import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface RelatorioResumo {
  totalGuardas: number;
  totalPostos: number;
  totalLotacoes: number;
  totalEscalas: number;
  guardasAtivos: number;
  lotacoesAtivas: number;
}

export interface RelatorioEscalaTipo {
  tipoEscala: string;
  totalEscalas: number;
}

@Injectable({
  providedIn: 'root'
})
export class RelatoriosApiService {

  private readonly apiUrl =
    `${environment.apiUrl}/relatorios`;

  constructor(
    private readonly http: HttpClient
  ) {}

  resumo(): Promise<RelatorioResumo> {
    return firstValueFrom(
      this.http.get<RelatorioResumo>(
        `${this.apiUrl}/resumo`
      )
    );
  }

  escalasPorTipo(): Promise<RelatorioEscalaTipo[]> {
    return firstValueFrom(
      this.http.get<RelatorioEscalaTipo[]>(
        `${this.apiUrl}/escalas/tipos`
      )
    );
  }
}