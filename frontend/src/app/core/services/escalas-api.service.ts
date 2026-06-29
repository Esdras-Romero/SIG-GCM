import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


import { environment } from '../../../environments/environment';

import { Escala, GerarEscalaRequest, } from '../models/escala.model';
import { UltimaEscalaResponse } from '../models/ultima-escala.model';

@Injectable({
  providedIn: 'root'
})
export class EscalasApiService {

  private readonly apiUrl =
    `${environment.apiUrl}/escalas`;

  constructor(
    private readonly http: HttpClient
  ) {}

  listar(): Promise<Escala[]> {
    return firstValueFrom(
      this.http.get<Escala[]>(this.apiUrl)
    );
  }

  gerar(
    request: GerarEscalaRequest
  ): Promise<Escala> {
    return firstValueFrom(
      this.http.post<Escala>(
        `${this.apiUrl}/gerar`,
        request
      )
    );
  }

  buscarUltimaEscala(
    postoId: string
  ): Promise<UltimaEscalaResponse> {

    return firstValueFrom(

      this.http.get<UltimaEscalaResponse>(
        `${this.apiUrl}/posto/${postoId}/ultima`
      )

    );

  }
}