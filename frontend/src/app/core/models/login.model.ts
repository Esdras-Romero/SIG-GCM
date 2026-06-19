import { Usuario } from './usuario.model';

export interface LoginRequest {
  email: string;
  senha: string;
}

export type LoginResponse = Usuario;