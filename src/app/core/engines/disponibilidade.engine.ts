import { Escala }
from '../models/escala.model';

export function buscarGuardasEmServico(

  escalas: Escala[],

  data: Date

): string[] {

  return escalas

    .filter(

      escala =>

        data >= escala.dataInicio &&
        data <= escala.dataFim

    )

    .map(

      escala => escala.guardaId

    );
}

export function buscarGuardasDeFolga(

  todosGuardas: string[],

  escalas: Escala[],

  data: Date

): string[] {

  const trabalhando =

    buscarGuardasEmServico(
      escalas,
      data
    );

  return todosGuardas.filter(

    guardaId =>

      !trabalhando.includes(
        guardaId
      )

  );
}