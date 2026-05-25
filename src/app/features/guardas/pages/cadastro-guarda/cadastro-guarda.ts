import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Guarda } from '../../../../core/models/guarda.model';
import { GuardaFacade } from '../../state/guarda.facade';

@Component({
  selector: 'app-cadastro-guarda',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './cadastro-guarda.html'
})
export class CadastroGuardaComponent {

  loading = signal(false);

  mensagemErro = signal('');

  guarda: Guarda = {
    id: crypto.randomUUID(),
    nome: '',
    matricula: '',
    tipoEscala: '24x120',
    ativo: true
  };

  constructor(
    private readonly guardaFacade: GuardaFacade,
    private readonly router: Router
  ) {}

  async salvar(): Promise<void> {

    try {

      this.loading.set(true);

      this.mensagemErro.set('');

      await this.guardaFacade
        .adicionar(this.guarda);

      await this.router.navigate([
        '/guardas'
      ]);

    } catch (error) {

      console.error(error);

      this.mensagemErro.set(
        'Erro ao cadastrar guarda.'
      );

    } finally {

      this.loading.set(false);

    }
  }
}