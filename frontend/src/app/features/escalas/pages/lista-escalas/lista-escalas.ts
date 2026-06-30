import { Component, OnInit, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { EscalasStore } from '../../../../core/stores/escalas.store';
import { PostosStore } from '../../../../core/stores/postos.store';
import { Escala } from '../../../../core/models/escala.model';

@Component({
  selector: 'app-lista-escalas',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './lista-escalas.html'
})
export class ListaEscalasComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  escalaParaImprimir = signal<Escala | null>(null);

  constructor(
    public readonly escalasStore: EscalasStore,
    public readonly postosStore: PostosStore
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading.set(true);

      await Promise.all([
        this.escalasStore.carregar(),
        this.postosStore.carregar()
      ]);

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao carregar escalas.');
    } finally {
      this.loading.set(false);
    }
  }

  async baixarPdf(escala: Escala): Promise<void> {

    await this.escalasStore.baixarPdf(escala.id);
  }

  nomePosto(postoId: string): string {
    return this.postosStore
      .postos()
      .find(posto => posto.id === postoId)
      ?.nome ?? 'Posto não encontrado';
  }

  obterGuardasDoGrupo(postoId: string, grupo: string | undefined): string {
    if (!grupo) return 'Nenhum grupo';

    const posto: any = this.postosStore.postos()
      .find((p: any) => p.id === postoId);

    if (!posto || !posto.lotacoes) {
      return 'Grupo ' + grupo;
    }

    const guardas = posto.lotacoes
      .filter((l: any) => l.grupo === grupo)
      .map((l: any) => l.guarda?.nome || 'Guarda não identificado');

    return guardas.length > 0 ? guardas.join(', ') : 'Grupo ' + grupo;
  }
}