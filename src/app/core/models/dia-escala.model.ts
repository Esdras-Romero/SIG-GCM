import {
  GrupoEscala,
  TurnoEscala
} from './lotacao.model';

export interface DiaEscala {
  id: string;
  data: string;
  grupo?: GrupoEscala;
  turno?: TurnoEscala;
  horaInicio: string;
  horaFim: string;
  extra: boolean;
  folga: boolean;
}