import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Posto } from '../models/posto.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostosApiService {

  private readonly apiUrl =
    `${environment.apiUrl}/postos`;

  constructor(
    private readonly http: HttpClient
  ) {}

  listar(): Promise<Posto[]> {
    return firstValueFrom(
      this.http.get<Posto[]>(this.apiUrl)
    );
  }

  criar(posto: Posto): Promise<Posto> {
    return firstValueFrom(
      this.http.post<Posto>(this.apiUrl, posto)
    );
  }

  atualizar(posto: Posto): Promise<Posto> {
    return firstValueFrom(
      this.http.put<Posto>(
        `${this.apiUrl}/${posto.id}`,
        posto
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