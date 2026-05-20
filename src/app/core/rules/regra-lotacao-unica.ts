import { Lotacao } from '../models/lotacao.model';

export function validarLotacaounica(

    guardaId: String,

    lotacoes: Lotacao[]
): boolean {

    const possuiLotacao = lotacoes.some(
        lotacao => lotacao.guardaId === guardaId
    );

    return !possuiLotacao;
}