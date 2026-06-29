import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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
export class CadastroGuardaComponent implements OnInit { 

  loading = signal(false);
  mensagemErro = signal('');
  origem = 'lista'; 

  guarda: Guarda = {
    id: '',
    nome: '',
    matricula: '',
    ativo: true
  };

  constructor(
    private readonly guardaFacade: GuardaFacade,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.origem = this.route.snapshot.queryParamMap.get('origem') ?? 'lista';
  }

  async voltar(): Promise<void> {
    if (this.origem === 'dashboard') {
      await this.router.navigate(['/dashboard']);
    } else {
      await this.router.navigate(['/guardas']);
    }
  }

  async salvar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      await this.guardaFacade.adicionar(this.guarda);

      this.voltar(); 

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('Erro ao cadastrar guarda.');
    } finally {
      this.loading.set(false);
    }
  }
}