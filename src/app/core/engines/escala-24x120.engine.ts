import { DiaEscala }
from '../models/dia-escala.model';

import { EscalaMensal }
from '../models/escala-mensal.model';

const grupos = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F'
] as const;

type Grupo =
typeof grupos[number];

export function gerarEscala24x120(

  postoId: string,

  mes: number,

  ano: number,

  grupoInicial: Grupo

): EscalaMensal {

  const dias: DiaEscala[] = [];

  const quantidadeDias =

    new Date(
      ano,
      mes,
      0
    ).getDate();

  let indiceGrupo =

    grupos.indexOf(grupoInicial);

  for(let dia = 1;
      dia <= quantidadeDias;
      dia++) {

    const grupoAtual =
      grupos[indiceGrupo];

    const extra =
      quantidadeDias % 6 !== 0 &&
      dia > 30  && 
      mes !== 2;

    dias.push({

      data:
        new Date(
          ano,
          mes - 1,
          dia
        ),

      grupo: grupoAtual,

      extra

    });

    indiceGrupo =
      (indiceGrupo + 1) %
      grupos.length;
  }

  const ultimoGrupo =

    dias[dias.length - 1]
      .grupo;

  return {

    postoId,

    mes,

    ano,

    dias,

    ultimoGrupo

  };
}