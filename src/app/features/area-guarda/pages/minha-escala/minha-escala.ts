import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { AuthApiService } from '../../../../core/services/auth-api.service';
import { AreaGuardaApiService } from '../../../../core/services/area-guarda-api.service';

import { Lotacao } from '../../../../core/models/lotacao.model';

@Component({
  selector: 'app-minha-escala',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './minha-escala.html'
})
export class MinhaEscalaComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  lotacao = signal<Lotacao | null>(null);

  constructor(
    private readonly authService: AuthApiService,
    private readonly areaGuardaService: AreaGuardaApiService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      const guardaId =
        this.authService.obterGuardaId();

      if (!guardaId) {
        this.mensagemErro.set(
          'Guarda não vinculado ao usuário.'
        );
        return;
      }

      const lotacao =
        await this.areaGuardaService.minhaLotacao(guardaId);

      this.lotacao.set(lotacao);

    } catch (error) {
      console.error(error);

      this.mensagemErro.set(
        'Erro ao carregar escala do guarda.'
      );

    } finally {
      this.loading.set(false);
    }
  }
}