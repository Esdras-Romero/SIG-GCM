import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthApiService } from '../../../../core/services/auth-api.service';

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
    private readonly authService: AuthApiService,
    private readonly router: Router
  ) {}

  async entrar(): Promise<void> {
    try {
      this.loading.set(true);
      this.mensagemErro.set('');

      const usuario = await this.authService.login({
        email: this.email,
        senha: this.senha
      });

      this.authService.salvarUsuario(usuario);

      if (usuario.perfil === 'ADMINISTRADOR') {
        await this.router.navigate(['/dashboard']);
        return;
      }

      if (usuario.perfil === 'GUARDA') {
        await this.router.navigate(['/area-guarda']);
        return;
      }

      this.mensagemErro.set('Perfil de usuário inválido.');

    } catch (error) {
      console.error(error);
      this.mensagemErro.set('E-mail ou senha inválidos.');
    } finally {
      this.loading.set(false);
    }
  }
}