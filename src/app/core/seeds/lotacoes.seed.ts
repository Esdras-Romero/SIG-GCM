import { Lotacao }
from '../models/lotacao.model';

import { GUARDAS_SEED }
from './guardas.seed';

import { POSTOS_SEED }
from './postos.seed';

export const LOTACOES_SEED:
Lotacao[] = [

  {
    id: crypto.randomUUID(),

    guardaId:
      GUARDAS_SEED[0].id,

    postoId:
      POSTOS_SEED[0].id,

    ativo:
      true,

    grupo:
      'A'
  },

  {
    id: crypto.randomUUID(),

    guardaId:
      GUARDAS_SEED[1].id,

    postoId:
      POSTOS_SEED[0].id,

    ativo:
      true,

    grupo:
      'B'
  },

  {
    id: crypto.randomUUID(),

    guardaId:
      GUARDAS_SEED[2].id,

    postoId:
      POSTOS_SEED[0].id,

    ativo:
      true,

    grupo:
      'C'
  }

];