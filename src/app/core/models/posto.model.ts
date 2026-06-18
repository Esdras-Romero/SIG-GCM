import { TipoEscala } from './guarda.model';

export interface Posto {
  id: string;
  nome: string;
  local: string;
  tipoEscala: TipoEscala;
  quantidadeMinima: number;
}
