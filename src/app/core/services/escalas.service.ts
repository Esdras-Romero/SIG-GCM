import { Injectable }
from '@angular/core';

import { EscalaMensal }
from '../models/escala-mensal.model';

import { SupabaseService }
from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class EscalasService {

  constructor(

    private readonly supabase:
      SupabaseService

  ) {}

  async listar():
    Promise<EscalaMensal[]> {

    const {
      data,
      error
    } = await this

      .supabase

      .client

      .from('escalas')

      .select('*');

    if(error) {

      throw error;
    }

    return data ?? [];
  }

  async criar(
    escala: EscalaMensal
  ): Promise<void> {

    const { error } =
      await this

        .supabase

        .client

        .from('escalas')

        .insert(escala);

    if(error) {

      throw error;
    }
  }

}