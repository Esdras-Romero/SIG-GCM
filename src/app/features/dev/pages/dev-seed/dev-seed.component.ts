import { Component, signal } from '@angular/core';
import { SeedService } from '../../../../core/services/seed.service';

@Component({
  selector: 'app-dev-seed',
  standalone: true,
  template: `
    <section class="p-6">
      <h1 class="text-2xl font-bold mb-4">
        Popular Banco de Dados
      </h1>

      <button
        class="px-4 py-2 rounded bg-blue-600 text-white"
        (click)="executarSeed()"
        [disabled]="loading()"
      >
        {{ loading() ? 'Executando...' : 'Popular Banco' }}
      </button>

      @if (mensagem()) {
        <p class="mt-4">
          {{ mensagem() }}
        </p>
      }
    </section>
  `
})
export class DevSeedComponent {
  loading = signal(false);
  mensagem = signal('');

  constructor(
    private readonly seedService: SeedService
  ) {}

  async executarSeed(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagem.set('');

      await this.seedService.executar();

      this.mensagem.set('Banco populado com sucesso!');
    } catch (error) {
      console.error(error);
      this.mensagem.set('Erro ao popular o banco. Verifique o console.');
    } finally {
      this.loading.set(false);
    }
  }
}