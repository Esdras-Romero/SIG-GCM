export interface Escala {

  id: string;

  guardaId: string;

  postoId: string;

  grupo:
    'A' |
    'B' |
    'C' |
    'D' |
    'E' |
    'F';

  dataInicio: Date;

  dataFim: Date;

  tipoEscala:
    '24x120' |
    'ADMINISTRATIVO';

}