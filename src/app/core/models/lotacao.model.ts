export type GrupoEscala =
  'A' |
  'B' |
  'C' |
  'D' |
  'E' |
  'F';

export type TurnoEscala =
  'DIA' |
  'NOITE' |
  'MANHA' |
  'TARDE';

export interface Lotacao {
  id: string;
  guardaId: string;
  postoId: string;
  ativo: boolean;
  grupo?: GrupoEscala;
  turno?: TurnoEscala;
}