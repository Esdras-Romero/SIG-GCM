import { Guarda }
from '../models/guarda.model';

import { Grupo }
from '../models/grupo.model';

import { Posto }
from '../models/posto.model';

export function criarGrupos(

  posto: Posto,

  guardas: Guarda[]

): Grupo[] {

  const nomesGrupos =

    [
      'A', 
      'B', 
      'C', 
      'D', 
      'E', 
      'F'
    ] as const;

  if(
    guardas.length <
    posto.quantidadeMinima
  ) {

    throw new Error(
      'Quantidade insuficiente de guardas.'
    );

  }

  return nomesGrupos.map(

    nomeGrupo => ({

      id:
        crypto.randomUUID(),

      nome: nomeGrupo,

      postoId: posto.id,

      guardas:

        guardas

          .filter(

            (_, indice) =>

              indice % 6 ===
              nomesGrupos.indexOf(
                nomeGrupo
              )
          )
          
          .map(

            guarda => guarda.id

          )

    })

  );
}