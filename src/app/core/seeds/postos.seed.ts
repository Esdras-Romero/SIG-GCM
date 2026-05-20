import { Posto }
from '../models/posto.model';

export const POSTOS_SEED:
Posto[] = [

  {
    id: crypto.randomUUID(),

    nome:
      'Posto Central',

    local:
      'Centro',

    tipoEscala:
      '24x120',

    quantidadeMinima:
      6
  },

  {
    id: crypto.randomUUID(),

    nome:
      'Posto Norte',

    local:
      'Zona Norte',

    tipoEscala:
      '24x120',

    quantidadeMinima:
      6
  },

  {
    id: crypto.randomUUID(),

    nome:
      'Administrativo Sede',

    local:
      'Prefeitura',

    tipoEscala:
      'ADMINISTRATIVO',

    quantidadeMinima:
      2
  }

];