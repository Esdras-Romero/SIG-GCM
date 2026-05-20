import { Injectable, signal, computed }
from '@angular/core';

import {
  AuthChangeEvent,
  Session,
  User
} from '@supabase/supabase-js';

import { SupabaseService }
from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private readonly supabase:
      SupabaseService

  ) {

    this.monitorarSessao();
  }

  private readonly _usuario =
    signal<User | null>(null);

  private readonly _session =
    signal<Session | null>(null);

  private readonly _loading =
    signal<boolean>(false);

  readonly usuario =
    this._usuario.asReadonly();

  readonly session =
    this._session.asReadonly();

  readonly loading =
    this._loading.asReadonly();

  readonly autenticado =
    computed(() =>

      this._usuario() !== null

    );

  async login(

    email: string,

    senha: string

  ): Promise<void> {

    try {

      this._loading.set(true);

      const {

        data,

        error

      } = await this

        .supabase

        .client

        .auth

        .signInWithPassword({

          email,

          password: senha

        });

      if(error) {

        throw error;
      }

      this._usuario.set(
        data.user
      );

      this._session.set(
        data.session
      );

    } finally {

      this._loading.set(false);
    }
  }

  async logout():
    Promise<void> {

    try {

      this._loading.set(true);

      const { error } =
        await this

          .supabase

          .client

          .auth

          .signOut();

      if(error) {

        throw error;
      }

      this._usuario.set(
        null
      );

      this._session.set(
        null
      );

    } finally {

      this._loading.set(false);
    }
  }

  async registrar(

    email: string,

    senha: string

  ): Promise<void> {

    try {

      this._loading.set(true);

      const { error } =
        await this

          .supabase

          .client

          .auth

          .signUp({

            email,

            password: senha

          });

      if(error) {

        throw error;
      }

    } finally {

      this._loading.set(false);
    }
  }

  async carregarUsuarioAtual():
    Promise<void> {

    const {

      data,

      error

    } = await this

      .supabase

      .client

      .auth

      .getUser();

    if(error) {

      throw error;
    }

    this._usuario.set(
      data.user
    );
  }

  async carregarSessaoAtual():
    Promise<void> {

    const {

      data,

      error

    } = await this

      .supabase

      .client

      .auth

      .getSession();

    if(error) {

      throw error;
    }

    this._session.set(
      data.session
    );
  }

  getToken():
    string | undefined {

    return this

      ._session()

      ?.access_token;
  }

  private monitorarSessao():
    void {

    this

      .supabase

      .client

      .auth

      .onAuthStateChange(

        (

          _event:
            AuthChangeEvent,

          session:
            Session | null

        ) => {

          this._session.set(
            session
          );

          this._usuario.set(
            session?.user ?? null
          );

        }

      );
  }

}