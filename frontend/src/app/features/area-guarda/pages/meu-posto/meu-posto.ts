import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { AuthApiService } from '../../../../core/services/auth-api.service';
import { AreaGuardaApiService } from '../../../../core/services/area-guarda-api.service';

import { Posto } from '../../../../core/models/posto.model';

@Component({
  selector: 'app-meu-posto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './meu-posto.html'
})
export class MeuPostoComponent implements OnInit {

  loading = signal(false);
  mensagemErro = signal('');

  posto = signal<Posto | null>(null);

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

      const posto =
        await this.areaGuardaService.meuPosto(guardaId);

      this.posto.set(posto);

    } catch (error) {
      console.error(error);

      this.mensagemErro.set(
        'Erro ao carregar posto de trabalho.'
      );

    } finally {
      this.loading.set(false);
    }
  }
}