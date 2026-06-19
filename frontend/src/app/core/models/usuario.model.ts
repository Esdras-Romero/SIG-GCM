export type PerfilUsuario =
  'ADMINISTRADOR' |
  'GUARDA';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  guardaId: string | null;
}