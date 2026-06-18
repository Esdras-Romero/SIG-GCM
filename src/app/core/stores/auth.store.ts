import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  private readonly _usuario =
    signal<Usuario | null>(null);

  readonly usuario =
    this._usuario.asReadonly();

  readonly autenticado =
    computed(() =>
      this._usuario() !== null
    );

  readonly perfil =
    computed(() =>
      this._usuario()?.perfil ?? null
    );

  readonly guardaId =
    computed(() =>
      this._usuario()?.guardaId ?? null
    );

  carregarDoStorage(): void {
    const usuarioSalvo =
      localStorage.getItem('usuarioLogado');

    if (usuarioSalvo) {
      this._usuario.set(
        JSON.parse(usuarioSalvo)
      );
    }
  }

  login(
    usuario: Usuario
  ): void {

    this._usuario.set(usuario);

    localStorage.setItem(
      'usuarioLogado',
      JSON.stringify(usuario)
    );
  }

  logout(): void {

    this._usuario.set(null);

    localStorage.removeItem(
      'usuarioLogado'
    );
  }
}