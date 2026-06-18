import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Posto } from '../../../../core/models/posto.model';
import { PostoFacade } from '../../state/posto.facade';

@Component({
  selector: 'app-editar-posto',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './editar-posto.component.html'
})
export class EditarPostoComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  posto: Posto = {
    id: '',
    nome: '',
    local: '',
    tipoEscala: '24x120',
    quantidadeMinima: 1
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly postoFacade: PostoFacade
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading.set(true);

      await this.postoFacade.carregar();

      const id =
        this.route.snapshot.paramMap.get('id');

      if (!id) {
        this.mensagemErro.set('Posto não encontrado.');
        return;
      }

      const postoEncontrado =
        this.postoFacade.buscarPorId(id);

      if (!postoEncontrado) {
        this.mensagemErro.set('Posto não encontrado.');
        return;
      }

      this.posto = {
        ...postoEncontrado
      };

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao carregar posto.');
    } finally {
      this.loading.set(false);
    }
  }

  async salvar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      await this.postoFacade.atualizar(this.posto);

      await this.router.navigate(['/postos']);

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao atualizar posto.');
    } finally {
      this.loading.set(false);
    }
  }
}