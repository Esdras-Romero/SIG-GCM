import { Injectable }
from '@angular/core';

import { Posto }
from '../models/posto.model';

import { SupabaseService }
from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class PostosService {

  constructor(

    private readonly supabase:
      SupabaseService

  ) {}

  async listar():
    Promise<Posto[]> {

    const {
      data,
      error
    } = await this

      .supabase

      .client

      .from('postos')

      .select('*');

    if(error) {

      throw error;
    }

    return data ?? [];
  }

  async criar(
    posto: Posto
  ): Promise<void> {

    const { error } =
      await this

        .supabase

        .client

        .from('postos')

        .insert(posto);

    if(error) {

      throw error;
    }
  }

}