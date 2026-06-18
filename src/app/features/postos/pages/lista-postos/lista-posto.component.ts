import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PostoFacade } from '../../state/posto.facade';

@Component({
  selector: 'app-lista-postos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista-posto.component.html'
})
export class ListaPostosComponent implements OnInit {

  loading = signal(false);
  mensagem = signal('');

  constructor(
    public readonly postoFacade: PostoFacade
  ) {}

  async ngOnInit(): Promise<void> {
    await this.carregar();
  }

  async carregar(): Promise<void> {
    try {
      this.loading.set(true);
      await this.postoFacade.carregar();
    } finally {
      this.loading.set(false);
    }
  }

  async remover(id: string): Promise<void> {
    const confirmar =
      confirm('Deseja realmente remover este posto?');

    if (!confirmar) {
      return;
    }

    try {
      await this.postoFacade.remover(id);
      this.mensagem.set('Posto removido com sucesso.');
    } catch (error) {
      console.error(error);
      this.mensagem.set('Erro ao remover posto.');
    }
  }
}