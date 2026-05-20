import { Feriado }
from '../models/feriado.model';

export const FERIADOS_SEED:
Feriado[] = [

  {
    id: crypto.randomUUID(),

    nome:
      'Confraternização Universal',

    data:
      '2026-01-01',

    nacional:
      true
  },

  {
    id: crypto.randomUUID(),

    nome:
      'Carnaval',

    data:
      '2026-02-17',

    nacional:
      true
  },

  {
    id: crypto.randomUUID(),

    nome:
      'Sexta-feira Santa',

    data:
      '2026-04-03',

    nacional:
      true
  },

  {
    id: crypto.randomUUID(),

    nome:
      'Tiradentes',

    data:
      '2026-04-21',

    nacional:
      true
  },

  {
    id: crypto.randomUUID(),

    nome:
      'Dia do Trabalho',

    data:
      '2026-05-01',

    nacional:
      true
  }

];