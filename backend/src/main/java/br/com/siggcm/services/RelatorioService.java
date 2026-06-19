package br.com.siggcm.services;

import br.com.siggcm.dtos.RelatorioEscalaDTO;
import br.com.siggcm.dtos.RelatorioResumoDTO;
import br.com.siggcm.dtos.TabelaEscalaMensalDTO;

import br.com.siggcm.repositories.EscalaRepository;
import br.com.siggcm.repositories.GuardaRepository;
import br.com.siggcm.repositories.LotacaoRepository;
import br.com.siggcm.repositories.PostoRepository;
import br.com.siggcm.services.EscalaConsultaService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RelatorioService {

    private final EscalaConsultaService escalaConsultaService;
    private final GuardaRepository guardaRepository;
    private final PostoRepository postoRepository;
    private final LotacaoRepository lotacaoRepository;
    private final EscalaRepository escalaRepository;

    public RelatorioService(
            EscalaConsultaService escalaConsultaService,
            GuardaRepository guardaRepository,
            PostoRepository postoRepository,
            LotacaoRepository lotacaoRepository,
            EscalaRepository escalaRepository
    ) {
        this.escalaConsultaService = escalaConsultaService;
        this.guardaRepository = guardaRepository;
        this.postoRepository = postoRepository;
        this.lotacaoRepository = lotacaoRepository;
        this.escalaRepository = escalaRepository;
    }

    public RelatorioResumoDTO gerarResumo() {
        long totalGuardas =
                guardaRepository.count();

        long totalPostos =
                postoRepository.count();

        long totalLotacoes =
                lotacaoRepository.count();

        long totalEscalas =
                escalaRepository.count();

        long guardasAtivos =
                guardaRepository
                        .findAll()
                        .stream()
                        .filter(guarda -> guarda.isAtivo())
                        .count();

        long lotacoesAtivas =
                lotacaoRepository
                        .findAll()
                        .stream()
                        .filter(lotacao -> lotacao.isAtivo())
                        .count();

        return new RelatorioResumoDTO(
                totalGuardas,
                totalPostos,
                totalLotacoes,
                totalEscalas,
                guardasAtivos,
                lotacoesAtivas
        );
    }

    public List<RelatorioEscalaDTO> gerarResumoEscalasPorTipo() {
        long total24x120 =
                escalaRepository
                        .findAll()
                        .stream()
                        .filter(escala ->
                                "24x120".equalsIgnoreCase(
                                        escala.getTipoEscala()
                                )
                        )
                        .count();

        long total12x60 =
                escalaRepository
                        .findAll()
                        .stream()
                        .filter(escala ->
                                "12x60".equalsIgnoreCase(
                                        escala.getTipoEscala()
                                )
                        )
                        .count();

        long totalAdministrativa =
                escalaRepository
                        .findAll()
                        .stream()
                        .filter(escala ->
                                "ADMINISTRATIVO".equalsIgnoreCase(
                                        escala.getTipoEscala()
                                )
                        )
                        .count();

        return List.of(
                new RelatorioEscalaDTO(
                        "24x120",
                        total24x120
                ),
                new RelatorioEscalaDTO(
                        "12x60",
                        total12x60
                ),
                new RelatorioEscalaDTO(
                        "ADMINISTRATIVO",
                        totalAdministrativa
                )
        );
    }

    public TabelaEscalaMensalDTO gerarTabelaMensalPorPosto(
        String postoId,
        Integer mes,
        Integer ano
    ) {
        return escalaConsultaService.tabelaMensalPorPosto(
                postoId,
                mes,
                ano
        );
    }
}
