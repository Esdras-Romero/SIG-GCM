import { Injectable } from '@angular/core';

import { GuardasStore } from '../stores/guardas.store';
import { PostosStore } from '../stores/postos.store';
import { LotacoesStore } from '../stores/lotacoes.store';
import { EscalasStore } from '../stores/escalas.store';

import { RelatorioGrupo } from '../models/relatorio-grupo.model';
import { EscalaVisual } from '../models/escala-visual.model';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(
    private readonly guardasStore: GuardasStore,
    private readonly postosStore: PostosStore,
    private readonly lotacoesStore: LotacoesStore,
    private readonly escalasStore: EscalasStore
  ) {}

  gerarRelatorioGrupos(): RelatorioGrupo[] {

    const postos =
      this.postosStore.postos();

    const lotacoes =
      this.lotacoesStore.lotacoesAtivas();

    return lotacoes
      .filter(lotacao => lotacao.grupo)
      .map(lotacao => {

        const posto =
          postos.find(p => p.id === lotacao.postoId);

        const quantidadeGuardas =
          lotacoes.filter(
            item =>
              item.postoId === lotacao.postoId &&
              item.grupo === lotacao.grupo &&
              item.ativo
          ).length;

        return {
          grupo: lotacao.grupo!,
          posto: posto?.nome ?? 'Posto não encontrado',
          local: posto?.local ?? 'Local não informado',
          quantidadeGuardas
        };

      });
  }

  gerarRelatorioEscalaMensal(
    postoId: string,
    mes: number,
    ano: number
  ): EscalaVisual[] {

    const guardas =
      this.guardasStore.guardas();

    const lotacoes =
      this.lotacoesStore.lotacoesAtivas();

    const escala =
      this.escalasStore.escalas()
        .find(
          item =>
            item.postoId === postoId &&
            item.mes === mes &&
            item.ano === ano
        );

    if(!escala) {
      return [];
    }

    const resultado: EscalaVisual[] = [];

    lotacoes
      .filter(lotacao => lotacao.postoId === postoId && lotacao.grupo)
      .forEach(lotacao => {

        const guarda =
          guardas.find(g => g.id === lotacao.guardaId);

        if(!guarda) {
          return;
        }

        const postos =
          this.postosStore.postos();

        const posto =
          postos.find(p => p.id === postoId);

        const diasTrabalho =
          escala.dias
            .filter(dia => dia.grupo === lotacao.grupo)
            .map(dia => dia.data.getDate());

        const diasExtras =
          escala.dias
            .filter(
              dia =>
                dia.grupo === lotacao.grupo &&
                dia.extra
            )
            .map(dia => dia.data.getDate());

        resultado.push({
          guarda: guarda.nome,
          matricula: guarda.matricula,
          posto: posto?.nome ?? 'Posto não encontrado',
          local: posto?.local ?? 'Localnão informado',
          diasTrabalho,
          diasExtras
        });

      });

    return resultado;
  }

  listarGuardasEmServicoPorData(
    data: Date
  ) {

    const escalas =
      this.escalasStore.escalas();

    const lotacoes =
      this.lotacoesStore.lotacoesAtivas();

    const guardas =
      this.guardasStore.guardas();

    const gruposDoDia =
      escalas
        .flatMap(escala =>
          escala.dias
            .filter(
              dia =>
                dia.data.toDateString() ===
                data.toDateString()
            )
            .map(dia => ({
              postoId: escala.postoId,
              grupo: dia.grupo
            }))
        );

    return lotacoes
      .filter(lotacao =>
        gruposDoDia.some(
          item =>
            item.postoId === lotacao.postoId &&
            item.grupo === lotacao.grupo
        )
      )
      .map(lotacao =>
        guardas.find(g => g.id === lotacao.guardaId)
      )
      .filter(Boolean);
  }

  listarGuardasDeFolgaPorData(
    data: Date
  ) {

    const todosGuardas =
      this.guardasStore.guardas();

    const emServico =
      this.listarGuardasEmServicoPorData(data);

    return todosGuardas.filter(
      guarda =>
        !emServico.some(
          item => item?.id === guarda.id
        )
    );
  }

}