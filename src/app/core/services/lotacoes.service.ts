import { Injectable } from '@angular/core';

import { Lotacao } from '../models/lotacao.model';

import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LotacoesService {

  constructor(
    private readonly supabase: SupabaseService
  ) {}

  async listar(): Promise<Lotacao[]> {

    const { data, error } = await this
      .supabase
      .client
      .from('lotacoes')
      .select('*');

    if (error) {
      throw error;
    }

    return (data ?? []).map(item => ({
      id: item.id,
      guardaId: item.guarda_id,
      postoId: item.posto_id,
      ativo: item.ativo,
      grupo: item.grupo,
      turno: item.turno
    }));
  }

  async criar(
    lotacao: Lotacao
  ): Promise<void> {

    const { error } = await this
      .supabase
      .client
      .from('lotacoes')
      .insert({
        id: lotacao.id,
        guarda_id: lotacao.guardaId,
        posto_id: lotacao.postoId,
        ativo: lotacao.ativo,
        grupo: lotacao.grupo,
        turno: lotacao.turno
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
      .from('lotacoes')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }

}