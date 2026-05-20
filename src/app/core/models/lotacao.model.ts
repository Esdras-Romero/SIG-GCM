export interface Lotacao {

  id: string;

  guardaId: string;

  postoId: string;

  ativo: boolean;

  grupo?:
    'A' |
    'B' |
    'C' |
    'D' |
    'E' |
    'F';

  turno?:
    'MANHA' |
    'TARDE';

}