import { Injectable } from '@angular/core';

import { Guarda } from '../models/guarda.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class GuardasService {

  constructor(
    private readonly supabase: SupabaseService
  ) {}

  async listar(): Promise<Guarda[]> {
    const { data, error } = await this.supabase.client
      .from('guardas')
      .select('*')
      .order('nome', { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map(item => ({
      id: item.id,
      nome: item.nome,
      matricula: item.matricula,
      tipoEscala: item.tipo_escala,
      ativo: item.ativo
    }));
  }

  async criar(guarda: Guarda): Promise<void> {
    const { error } = await this.supabase.client
      .from('guardas')
      .insert({
        id: guarda.id,
        nome: guarda.nome,
        matricula: guarda.matricula,
        tipo_escala: guarda.tipoEscala,
        ativo: guarda.ativo
      });

    if (error) {
      throw error;
    }
  }

  async atualizar(guarda: Guarda): Promise<void> {
    const { error } = await this.supabase.client
      .from('guardas')
      .update({
        nome: guarda.nome,
        matricula: guarda.matricula,
        tipo_escala: guarda.tipoEscala,
        ativo: guarda.ativo
      })
      .eq('id', guarda.id);

    if (error) {
      throw error;
    }
  }

  async remover(id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('guardas')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  }
}