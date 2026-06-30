package br.com.siggcm.services;

import br.com.siggcm.dtos.GuardaDTO;
import br.com.siggcm.dtos.LotacaoDTO;
import br.com.siggcm.dtos.PostoDTO;
import br.com.siggcm.entities.GuardaEntity;
import br.com.siggcm.mappers.GuardaMapper;
import br.com.siggcm.mappers.LotacaoMapper;
import br.com.siggcm.mappers.PostoMapper;
import br.com.siggcm.repositories.EscalaRepository;
import br.com.siggcm.repositories.GuardaRepository;
import br.com.siggcm.repositories.LotacaoRepository;
import br.com.siggcm.repositories.PostoRepository;
import br.com.siggcm.dtos.CalendarioGuardaDTO;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AreaGuardaService {

    private final EscalaConsultaService escalaConsultaService;
    private final GuardaRepository guardaRepository;
    private final LotacaoRepository lotacaoRepository;
    private final PostoRepository postoRepository;
    private final EscalaRepository escalaRepository;

    public AreaGuardaService(
            EscalaConsultaService escalaConsultaService,
            GuardaRepository guardaRepository,
            LotacaoRepository lotacaoRepository,
            PostoRepository postoRepository,
            EscalaRepository escalaRepository
    ) {
        this.escalaConsultaService = escalaConsultaService;
        this.guardaRepository = guardaRepository;
        this.lotacaoRepository = lotacaoRepository;
        this.postoRepository = postoRepository;
        this.escalaRepository = escalaRepository;
    }

    public GuardaDTO meusDados(String guardaId) {
        GuardaEntity guarda = guardaRepository
                .findById(UUID.fromString(guardaId))
                .orElseThrow(() -> new RuntimeException("Guarda não encontrado."));

        return GuardaMapper.toDTO(guarda);
    }

    public LotacaoDTO minhaLotacao(String guardaId) {
        return lotacaoRepository
                .findByGuardaId(UUID.fromString(guardaId))
                .stream()
                .filter(lotacao -> lotacao.isAtivo())
                .findFirst()
                .map(LotacaoMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Lotação ativa não encontrada."));
    }

    public PostoDTO meuPosto(String guardaId) {
        LotacaoDTO lotacao = minhaLotacao(guardaId);

        return postoRepository
                .findById(UUID.fromString(lotacao.postoId()))
                .map(PostoMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Posto não encontrado."));
    }

    public CalendarioGuardaDTO calendario(
        String guardaId,
        Integer mes,
        Integer ano
    ) {
        return escalaConsultaService.calendarioGuarda(
                guardaId,
                mes,
                ano
        );
    }
}