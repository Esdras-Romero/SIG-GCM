import { Injectable } from '@angular/core';

import { Feriado } from '../models/feriado.model';

import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class FeriadoService {

  constructor(
    private readonly supabase: SupabaseService
  ) {}

  async listar(): Promise<Feriado[]> {

    const { data, error } = await this
      .supabase
      .client
      .from('feriados')
      .select('*')
      .order('data', {
        ascending: true
      });

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  async criar(
    feriado: Feriado
  ): Promise<void> {

    const { error } = await this
      .supabase
      .client
      .from('feriados')
      .insert({
        id: feriado.id,
        nome: feriado.nome,
        data: feriado.data,
        nacional: feriado.nacional
      });

    if (error) {
      throw error;
    }
  }

  async remover(
    id: string
  ): Promise<void> {

    const { error } = await this
      .supabase
      .client
      .from('feriados')
      .delete()
      .eq('id', id);

    if (error) {
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

    const { data, error } = await this
      .supabase
      .client
      .from('feriados')
      .select('id')
      .eq('data', dataFormatada);

    if (error) {
      throw error;
    }

    return data.length > 0;
  }

}