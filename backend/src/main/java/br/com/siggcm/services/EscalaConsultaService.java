package br.com.siggcm.services;

import br.com.siggcm.dtos.*;
import br.com.siggcm.entities.*;
import br.com.siggcm.repositories.*;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.*;

@Service
public class EscalaConsultaService {

    private final EscalaRepository escalaRepository;
    private final LotacaoRepository lotacaoRepository;
    private final GuardaRepository guardaRepository;
    private final PostoRepository postoRepository;

    public EscalaConsultaService(
            EscalaRepository escalaRepository,
            LotacaoRepository lotacaoRepository,
            GuardaRepository guardaRepository,
            PostoRepository postoRepository
    ) {
        this.escalaRepository = escalaRepository;
        this.lotacaoRepository = lotacaoRepository;
        this.guardaRepository = guardaRepository;
        this.postoRepository = postoRepository;
    }

    public CalendarioGuardaDTO calendarioGuarda(
            String guardaId,
            Integer mes,
            Integer ano
    ) {
        LotacaoEntity lotacao =
                buscarLotacaoAtivaPorGuarda(guardaId);

        PostoEntity posto =
                postoRepository.findById(lotacao.getPostoId())
                        .orElseThrow(() ->
                                new RuntimeException("Posto não encontrado.")
                        );

        List<EscalaEntity> escalas =
                escalaRepository.findByPostoIdAndMesAndAno(
                        lotacao.getPostoId(),
                        mes,
                        ano
                );

        List<DiaEscalaResumoDTO> dias =
                montarDiasDaLotacao(
                        lotacao,
                        escalas,
                        mes,
                        ano
                );

        return new CalendarioGuardaDTO(
                posto.getNome(),
                posto.getLocal(),
                posto.getTipoEscala(),
                lotacao.getGrupo(),
                lotacao.getTurno(),
                mes,
                ano,
                dias
        );
    }

    public TabelaEscalaMensalDTO tabelaMensalPorPosto(
            String postoId,
            Integer mes,
            Integer ano
    ) {
        UUID postoUuid =
                UUID.fromString(postoId);

        PostoEntity posto =
                postoRepository.findById(postoUuid)
                        .orElseThrow(() ->
                                new RuntimeException("Posto não encontrado.")
                        );

        List<LotacaoEntity> lotacoes =
                lotacaoRepository.findByPostoId(postoUuid)
                        .stream()
                        .filter(LotacaoEntity::isAtivo)
                        .toList();

        List<EscalaEntity> escalas =
                escalaRepository.findByPostoIdAndMesAndAno(
                        postoUuid,
                        mes,
                        ano
                );

        YearMonth yearMonth =
                YearMonth.of(ano, mes);

        List<Integer> dias =
                new ArrayList<>();

        List<String> diasSemana =
                new ArrayList<>();

        for (int dia = 1; dia <= yearMonth.lengthOfMonth(); dia++) {
            LocalDate data =
                    LocalDate.of(ano, mes, dia);

            dias.add(dia);

            diasSemana.add(
                    nomeDiaSemana(data)
            );
        }

        List<LinhaTabelaEscalaDTO> linhas =
                lotacoes.stream()
                        .map(lotacao ->
                                montarLinha(
                                        lotacao,
                                        escalas,
                                        mes,
                                        ano
                                )
                        )
                        .toList();

        return new TabelaEscalaMensalDTO(
                posto.getId().toString(),
                posto.getNome(),
                posto.getLocal(),
                mes,
                ano,
                dias,
                diasSemana,
                linhas
        );
    }

    private static final Locale LOCALE_BR =
            Locale.of("pt","BR");

    private LotacaoEntity buscarLotacaoAtivaPorGuarda(
            String guardaId
    ) {
        return lotacaoRepository
                .findByGuardaId(
                        UUID.fromString(guardaId)
                )
                .stream()
                .filter(LotacaoEntity::isAtivo)
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Lotação ativa não encontrada.")
                );
    }

    private LinhaTabelaEscalaDTO montarLinha(
            LotacaoEntity lotacao,
            List<EscalaEntity> escalas,
            Integer mes,
            Integer ano
    ) {
        GuardaEntity guarda =
                guardaRepository.findById(lotacao.getGuardaId())
                        .orElseThrow(() ->
                                new RuntimeException("Guarda não encontrado.")
                        );

        List<DiaEscalaResumoDTO> dias =
                montarDiasDaLotacao(
                        lotacao,
                        escalas,
                        mes,
                        ano
                );

        int total =
                (int) dias.stream()
                        .filter(DiaEscalaResumoDTO::emServico)
                        .count();

        return new LinhaTabelaEscalaDTO(
                guarda.getId().toString(),
                guarda.getMatricula(),
                guarda.getNome(),
                lotacao.getGrupo(),
                lotacao.getTurno(),
                total,
                dias
        );
    }

    private List<DiaEscalaResumoDTO> montarDiasDaLotacao(
            LotacaoEntity lotacao,
            List<EscalaEntity> escalas,
            Integer mes,
            Integer ano
    ) {
        YearMonth yearMonth =
                YearMonth.of(ano, mes);

        List<DiaEscalaResumoDTO> dias =
                new ArrayList<>();

        for (int dia = 1; dia <= yearMonth.lengthOfMonth(); dia++) {
            LocalDate data =
                    LocalDate.of(ano, mes, dia);

            Optional<DiaEscalaEntity> diaServico =
                    escalas.stream()
                            .flatMap(escala ->
                                    escala.getDias().stream()
                            )
                            .filter(item ->
                                    item.getData().equals(data)
                            )
                            .filter(item ->
                                    correspondeLotacao(
                                            lotacao,
                                            item
                                    )
                            )
                            .findFirst();

            dias.add(
                    montarResumoDia(
                            data,
                            diaServico
                    )
            );
        }

        return dias;
    }

    private boolean correspondeLotacao(
            LotacaoEntity lotacao,
            DiaEscalaEntity dia
    ) {
        boolean mesmoGrupo =
                lotacao.getGrupo() == null ||
                lotacao.getGrupo().equals(dia.getGrupo());

        boolean mesmoTurno =
                lotacao.getTurno() == null ||
                lotacao.getTurno().equals(dia.getTurno());

        return mesmoGrupo && mesmoTurno;
    }

    private DiaEscalaResumoDTO montarResumoDia(
            LocalDate data,
            Optional<DiaEscalaEntity> diaServico
    ) {
        if (diaServico.isEmpty()) {
            return new DiaEscalaResumoDTO(
                    data.getDayOfMonth(),
                    data,
                    nomeDiaSemana(data),
                    "",
                    false,
                    false,
                    false,
                    null,
                    null
            );
        }

        DiaEscalaEntity item =
                diaServico.get();

        return new DiaEscalaResumoDTO(
                data.getDayOfMonth(),
                data,
                nomeDiaSemana(data),
                valorDia(item),
                true,
                item.isExtra(),
                item.isFolga(),
                item.getHoraInicio(),
                item.getHoraFim()
        );
    }

    private String valorDia(
            DiaEscalaEntity item
    ) {
        if (item.getTurno() == null) {
            return "24h";
        }

        return switch (item.getTurno()) {
            case "DIA" -> "12h";
            case "NOITE" -> "N";
            case "MANHA" -> "M";
            case "TARDE" -> "T";
            default -> item.getTurno();
        };
    }

    private String nomeDiaSemana(
            LocalDate data
    ) {
        return data
                .getDayOfWeek()
                .getDisplayName(
                        TextStyle.SHORT,
                        LOCALE_BR
                );
    }
}