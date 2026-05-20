export interface EscalaAdministrativa {

  id: String;

  guardaId: string;

  postoId: string;

  turno:
    'MANHA' |
    'TARDE';

  data: Date;

  feriado: boolean;

}