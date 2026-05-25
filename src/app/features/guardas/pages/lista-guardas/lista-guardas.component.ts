import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GuardaFacade } from '../../state/guarda.facade';

@Component({
  selector: 'app-lista-guardas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista-guardas.component.html'
})
export class ListaGuardasComponent implements OnInit {

  loading = signal(false);
  mensagem = signal('');

  constructor(
    public readonly guardaFacade: GuardaFacade
  ) {}

  async ngOnInit(): Promise<void> {
    await this.carregar();
  }

  async carregar(): Promise<void> {
    try {
      this.loading.set(true);
      await this.guardaFacade.carregar();
    } finally {
      this.loading.set(false);
    }
  }

  async remover(id: string): Promise<void> {
    const confirmar = confirm('Deseja realmente remover este guarda?');

    if (!confirmar) {
      return;
    }

    try {
      await this.guardaFacade.remover(id);
      this.mensagem.set('Guarda removido com sucesso.');
    } catch (error) {
      console.error(error);
      this.mensagem.set('Erro ao remover guarda.');
    }
  }
}