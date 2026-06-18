import { Component, OnInit, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

import { RelatoriosStore } from '../../../core/stores/relatorios.store';

@Component({
  selector: 'app-resumo-relatorios',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resumo-relatorios.html'
})
export class ResumoRelatoriosComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  constructor(
    public readonly relatoriosStore: RelatoriosStore
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading.set(true);

      await Promise.all([
        this.relatoriosStore.carregarResumo(),
        this.relatoriosStore.carregarEscalasPorTipo()
      ]);

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao carregar relatórios.');
    } finally {
      this.loading.set(false);
    }
  }
}