import {
  Injectable,
  signal,
  computed
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  private readonly _usuario =
    signal<string | null>(
      null
    );

  readonly usuario =
    this._usuario.asReadonly();

  readonly autenticado =
    computed(() =>

      this._usuario() !== null

    );

  login(
    usuario: string
  ): void {

    this._usuario.set(
      usuario
    );
  }

  logout(): void {

    this._usuario.set(
      null
    );
  }

}