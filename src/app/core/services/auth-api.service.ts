import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  LoginRequest,
  LoginResponse
} from '../models/login.model';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private readonly apiUrl =
    `${environment.apiUrl}/auth/login`;

  constructor(
    private readonly http: HttpClient
  ) {}

  login(
    request: LoginRequest
  ): Promise<LoginResponse> {
    return firstValueFrom(
      this.http.post<LoginResponse>(
        this.apiUrl,
        request
      )
    );
  }

  salvarUsuario(
    usuario: Usuario
  ): void {
    localStorage.setItem(
      'usuarioLogado',
      JSON.stringify(usuario)
    );
  }

  obterUsuario(): Usuario | null {
    const usuario =
      localStorage.getItem('usuarioLogado');

    return usuario
      ? JSON.parse(usuario)
      : null;
  }

  estaLogado(): boolean {
    return this.obterUsuario() !== null;
  }

  obterPerfil() {
    return this.obterUsuario()?.perfil ?? null;
  }

  obterGuardaId(): string | null {
    return this.obterUsuario()?.guardaId ?? null;
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
  }
}