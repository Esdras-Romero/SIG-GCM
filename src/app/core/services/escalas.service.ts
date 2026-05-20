import { Injectable } from '@angular/core';

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

    const { data, error } =
      await this
        .supabase
        .client
        .from('escalas')
        .select('*');

    if(error) {
      throw error;
    }

    return (data ?? []).map(
      item => ({

        id:
          item.id,

        postoId:
          item.posto_id,

        mes:
          item.mes,

        ano:
          item.ano,

        dias:
          item.dias,

        ultimoGrupo:
          item.ultimo_grupo

      })
    );
  }

  async criar(
    escala: EscalaMensal
  ): Promise<void> {

    const { error } =
      await this
        .supabase
        .client
        .from('escalas')
        .insert({

          id:
            escala.id,

          posto_id:
            escala.postoId,

          mes:
            escala.mes,

          ano:
            escala.ano,

          dias:
            escala.dias,

          ultimo_grupo:
            escala.ultimoGrupo

        });

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
        .from('escalas')
        .delete()
        .eq('id', id);

    if(error) {
      throw error;
    }
  }

}