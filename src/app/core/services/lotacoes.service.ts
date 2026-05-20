import { Injectable }
from '@angular/core';

import { Lotacao }
from '../models/lotacao.model';

import { SupabaseService }
from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LotacoesService {

  constructor(

    private readonly supabase:
      SupabaseService

  ) {}

  async listar():
    Promise<Lotacao[]> {

    const {
      data,
      error
    } = await this

      .supabase

      .client

      .from('lotacoes')

      .select('*');

    if(error) {

      throw error;
    }

    return data ?? [];
  }

  async criar(
    lotacao: Lotacao
  ): Promise<void> {

    const { error } =
      await this

        .supabase

        .client

        .from('lotacoes')

        .insert(lotacao);

    if(error) {

      throw error;
    }
  }

}