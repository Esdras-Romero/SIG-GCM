import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  senha = '';

  loading = signal(false);
  mensagemErro = signal('');

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async entrar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      await this.authService.login(
        this.email,
        this.senha
      );

      await this.router.navigate([
        '/dashboard'
      ]);

    } catch (error) {
      console.error(error);

      this.mensagemErro.set(
        'E-mail ou senha inválidos.'
      );

    } finally {
      this.loading.set(false);
    }
  }
}