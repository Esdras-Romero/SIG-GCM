import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Posto } from '../../../../core/models/posto.model';
import { PostoFacade } from '../../state/posto.facade';

@Component({
  selector: 'app-cadastro-posto',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro-posto.component.html'
})
export class CadastroPostoComponent {

  loading = signal(false);
  mensagemErro = signal('');

  posto: Posto = {
    id: crypto.randomUUID(),
    nome: '',
    local: '',
    tipoEscala: '24x120',
    quantidadeMinima: 1
  };

  constructor(
    private readonly postoFacade: PostoFacade,
    private readonly router: Router
  ) {}

  async salvar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      await this.postoFacade.adicionar(this.posto);

      await this.router.navigate(['/postos']);

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao cadastrar posto.');
    } finally {
      this.loading.set(false);
    }
  }
}