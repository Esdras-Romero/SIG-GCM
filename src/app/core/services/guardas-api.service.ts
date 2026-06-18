import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Guarda } from '../models/guarda.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuardasApiService {

  private readonly apiUrl =
    `${environment.apiUrl}/guardas`;

  constructor(
    private readonly http: HttpClient
  ) {}

  listar(): Promise<Guarda[]> {
    return firstValueFrom(
      this.http.get<Guarda[]>(this.apiUrl)
    );
  }

  criar(
    guarda: Guarda
  ): Promise<Guarda> {

    return firstValueFrom(
      this.http.post<Guarda>(
        this.apiUrl,
        guarda
      )
    );
  }

  atualizar(
    guarda: Guarda
  ): Promise<Guarda> {

    return firstValueFrom(
      this.http.put<Guarda>(
        `${this.apiUrl}/${guarda.id}`,
        guarda
      )
    );
  }

  remover(
    id: string
  ): Promise<void> {

    return firstValueFrom(
      this.http.delete<void>(
        `${this.apiUrl}/${id}`
      )
    );
  }
}