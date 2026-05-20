import { DiaEscala } from './dia-escala.model';

export interface EscalaMensal {

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