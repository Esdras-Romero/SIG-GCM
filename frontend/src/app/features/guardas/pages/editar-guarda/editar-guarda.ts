import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Guarda } from '../../../../core/models/guarda.model';
import { GuardaFacade } from '../../state/guarda.facade';

@Component({
  selector: 'app-editar-guarda',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './editar-guarda.html'
})
export class EditarGuardaComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  guarda: Guarda = {
    id: '',
    nome: '',
    matricula: '',
    ativo: true
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly guardaFacade: GuardaFacade
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading.set(true);

      await this.guardaFacade.carregar();

      const id =
        this.route.snapshot.paramMap.get('id');

      if (!id) {
        this.mensagemErro.set('Guarda não encontrado.');
        return;
      }

      const guardaEncontrado =
        this.guardaFacade.buscarPorId(id);

      if (!guardaEncontrado) {
        this.mensagemErro.set('Guarda não encontrado.');
        return;
      }

      this.guarda = {
        ...guardaEncontrado
      };

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao carregar guarda.');
    } finally {
      this.loading.set(false);
    }
  }

  async salvar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      await this.guardaFacade.atualizar(this.guarda);

      await this.router.navigate(['/guardas']);

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao atualizar guarda.');
    } finally {
      this.loading.set(false);
    }
  }
}