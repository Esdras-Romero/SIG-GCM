import { DiaEscala } from './dia-escala.model';

export interface EscalaMensal {

  id: string;

  postoId: string;

  mes: number;

  ano: number;

  dias: DiaEscala[];

  ultimoGrupo:
    'A' |
    'B' |
    'C' |
    'D' |
    'E' |
    'F';

}