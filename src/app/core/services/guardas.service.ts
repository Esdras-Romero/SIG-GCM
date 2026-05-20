import { Injectable }
from '@angular/core';

import { Guarda }
from '../models/guarda.model';

import { SupabaseService }
from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class GuardasService {

  constructor(

    private readonly supabase:
      SupabaseService

  ) {}

  async listar():
    Promise<Guarda[]> {

    const {
      data,
      error
    } = await this

      .supabase

      .client

      .from('guardas')

      .select('*');

    if(error) {

      throw error;
    }

    return data ?? [];
  }

  async criar(
    guarda: Guarda
  ): Promise<void> {

    const { error } =
      await this

        .supabase

        .client

        .from('guardas')

        .insert(guarda);

    if(error) {

      throw error;
    }
  }

  async remover(
    id: string
  ): Promise<void> {

    const { error } =
      await this

        .supabase

        .client

        .from('guardas')

        .delete()

        .eq('id', id);

    if(error) {

      throw error;
    }
  }

}