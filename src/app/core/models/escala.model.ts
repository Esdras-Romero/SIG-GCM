import { TipoEscala } from './guarda.model';
import { DiaEscala } from './dia-escala.model';

export interface Escala {
  id: string;
  postoId: string;
  mes: number;
  ano: number;
  tipoEscala: TipoEscala;
  status: string;
  dias: DiaEscala[];
}

export interface GerarEscalaRequest {
  postoId: string;
  mes: number;
  ano: number;
  tipoEscala: TipoEscala;
  grupoInicial?: string;
  grupoInicialDia?: string;
  grupoInicialNoite?: string;
}