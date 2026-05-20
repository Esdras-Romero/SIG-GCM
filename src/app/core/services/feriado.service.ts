// src/app/core/services/feriado.service.ts

import { Injectable }
from '@angular/core';

import { Feriado }
from '../models/feriado.model';

import { SupabaseService }
from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class FeriadoService {

  constructor(

    private readonly supabase:
      SupabaseService

  ) {}

  async listar():
    Promise<Feriado[]> {

    const {

      data,

      error

    } = await this

      .supabase

      .client

      .from('feriados')

      .select('*')

      .order(
        'data',
        {
          ascending: true
        }
      );

    if(error) {

      throw error;
    }

    return data ?? [];
  }

  async buscarPorId(
    id: string
  ): Promise<Feriado | null> {

    const {

      data,

      error

    } = await this

      .supabase

      .client

      .from('feriados')

      .select('*')

      .eq('id', id)

      .single();

    if(error) {

      throw error;
    }

    return data;
  }

  async criar(
    feriado: Feriado
  ): Promise<void> {

    const { error } =
      await this

        .supabase

        .client

        .from('feriados')

        .insert(feriado);

    if(error) {

      throw error;
    }
  }

  async atualizar(
    feriado: Feriado
  ): Promise<void> {

    const { error } =
      await this

        .supabase

        .client

        .from('feriados')

        .update({

          nome:
            feriado.nome,

          data:
            feriado.data,

          nacional:
            feriado.nacional

        })

        .eq(
          'id',
          feriado.id
        );

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

        .from('feriados')

        .delete()

        .eq('id', id);

    if(error) {

      throw error;
    }
  }

  async isFeriado(
    dataVerificacao: Date
  ): Promise<boolean> {

    const dataFormatada =

      dataVerificacao

        .toISOString()

        .split('T')[0];

    const {

      data,

      error

    } = await this

      .supabase

      .client

      .from('feriados')

      .select('id')

      .eq(
        'data',
        dataFormatada
      );

    if(error) {

      throw error;
    }

    return (
      data.length > 0
    );
  }

  async listarPorAno(
    ano: number
  ): Promise<Feriado[]> {

    const inicio =
      `${ano}-01-01`;

    const fim =
      `${ano}-12-31`;

    const {

      data,

      error

    } = await this

      .supabase

      .client

      .from('feriados')

      .select('*')

      .gte(
        'data',
        inicio
      )

      .lte(
        'data',
        fim
      )

      .order(
        'data',
        {
          ascending: true
        }
      );

    if(error) {

      throw error;
    }

    return data ?? [];
  }

}