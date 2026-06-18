import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthApiService } from '../../../../core/services/auth-api.service';

@Component({
  selector: 'app-home-guarda',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-guarda.html'
})
export class HomeGuardaComponent {

  private readonly authService = inject(AuthApiService);

  usuario = this.authService.obterUsuario();
}
