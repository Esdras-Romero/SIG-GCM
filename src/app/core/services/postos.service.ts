import { Injectable } from '@angular/core';

import { Posto } from '../models/posto.model';

import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class PostosService {

  constructor(
    private readonly supabase: SupabaseService
  ) {}

  async listar(): Promise<Posto[]> {

    const { data, error } = await this
      .supabase
      .client
      .from('postos')
      .select('*');

    if (error) {
      throw error;
    }

    return (data ?? []).map(item => ({
      id: item.id,
      nome: item.nome,
      local: item.local,
      tipoEscala: item.tipo_escala,
      quantidadeMinima: item.quantidade_minima
    }));
  }

  async criar(
    posto: Posto
  ): Promise<void> {

    const { error } = await this
      .supabase
      .client
      .from('postos')
      .insert({
        id: posto.id,
        nome: posto.nome,
        local: posto.local,
        tipo_escala: posto.tipoEscala,
        quantidade_minima: posto.quantidadeMinima
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
      .from('postos')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }

}