import { EscalaAdministrativa }
from '../models/administrativo.model';

import { validarDiaUtil }
from '../rules/regra-administrativa';

export function gerarEscalaAdministrativa(

  guardaId: string,

  postoId: string,

  turno:
    'MANHA' |
    'TARDE',

  mes: number,

  ano: number,

  feriados: Date[]

): EscalaAdministrativa[] {

  const escalas:
    EscalaAdministrativa[] = [];

  const diasMes =

    new Date(
      ano,
      mes,
      0
    ).getDate();

  for(let dia = 1;
      dia <= diasMes;
      dia++) {

    const data =

      new Date(
        ano,
        mes - 1,
        dia
      );

    const valido =

      validarDiaUtil(
        data,
        feriados
      );

    if(valido) {

      escalas.push({

        id:
          crypto.randomUUID(),

        guardaId,

        postoId,

        turno,

        data,

        feriado: false

      });

    }

  }

  return escalas;
}