import { Lotacao }
from '../models/lotacao.model';

export function transferirGuarda(

  guardaId: string,

  novoPostoId: string,

  lotacoes: Lotacao[],

  grupo?:
    'A' |
    'B' |
    'C' |
    'D' |
    'E' |
    'F',

  turno?:
    'MANHA' |
    'TARDE'

): Lotacao[] {

  const lotacaoAtual =

    lotacoes.find(

      lotacao =>

        lotacao.guardaId === guardaId &&
        lotacao.ativo

    );

  if(!lotacaoAtual) {

    throw new Error(
      'Guarda sem lotação ativa.'
    );

  }

  lotacaoAtual.ativo = false;

  const novaLotacao: Lotacao = {

    id: crypto.randomUUID(),

    guardaId,

    postoId: novoPostoId,

    ativo: true,

    grupo,

    turno

  };

  return [

    ...lotacoes,

    novaLotacao

  ];
}