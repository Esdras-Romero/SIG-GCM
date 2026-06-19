import { Component, OnInit, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

import { EscalasStore } from '../../../../core/stores/escalas.store';
import { PostosStore } from '../../../../core/stores/postos.store';

@Component({
  selector: 'app-lista-escalas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista-escalas.html'
})
export class ListaEscalasComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

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

  nomePosto(postoId: string): string {
    return this.postosStore
      .postos()
      .find(posto => posto.id === postoId)
      ?.nome ?? 'Posto não encontrado';
  }
}