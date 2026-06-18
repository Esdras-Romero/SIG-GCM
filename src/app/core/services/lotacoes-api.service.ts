import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Lotacao } from '../models/lotacao.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LotacoesApiService {

  private readonly apiUrl =
    `${environment.apiUrl}/lotacoes`;

  constructor(
    private readonly http: HttpClient
  ) {}

  listar(): Promise<Lotacao[]> {
    return firstValueFrom(
      this.http.get<Lotacao[]>(this.apiUrl)
    );
  }

  criar(lotacao: Lotacao): Promise<Lotacao> {
    return firstValueFrom(
      this.http.post<Lotacao>(this.apiUrl, lotacao)
    );
  }

  atualizar(lotacao: Lotacao): Promise<Lotacao> {
    return firstValueFrom(
      this.http.put<Lotacao>(
        `${this.apiUrl}/${lotacao.id}`,
        lotacao
      )
    );
  }

  remover(id: string): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(
        `${this.apiUrl}/${id}`
      )
    );
  }
}