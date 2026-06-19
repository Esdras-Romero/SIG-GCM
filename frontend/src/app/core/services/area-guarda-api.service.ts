import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Guarda } from '../models/guarda.model';
import { Lotacao } from '../models/lotacao.model';
import { Posto } from '../models/posto.model';

@Injectable({
  providedIn: 'root'
})
export class AreaGuardaApiService {

  private readonly apiUrl =
    `${environment.apiUrl}/area-guarda`;

  constructor(
    private readonly http: HttpClient
  ) {}

  meusDados(
    guardaId: string
  ): Promise<Guarda> {
    return firstValueFrom(
      this.http.get<Guarda>(
        `${this.apiUrl}/${guardaId}/meus-dados`
      )
    );
  }

  minhaLotacao(
    guardaId: string
  ): Promise<Lotacao> {
    return firstValueFrom(
      this.http.get<Lotacao>(
        `${this.apiUrl}/${guardaId}/minha-lotacao`
      )
    );
  }

  meuPosto(
    guardaId: string
  ): Promise<Posto> {
    return firstValueFrom(
      this.http.get<Posto>(
        `${this.apiUrl}/${guardaId}/meu-posto`
      )
    );
  }
}