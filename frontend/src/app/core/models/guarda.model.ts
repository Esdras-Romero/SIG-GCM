export type TipoEscala =
  '24x120' |
  '12x60' |
  'ADMINISTRATIVO';

export interface Guarda {
  id: string;
  nome: string;
  matricula: string;
  tipoEscala?: TipoEscala | null;
  ativo: boolean;
}