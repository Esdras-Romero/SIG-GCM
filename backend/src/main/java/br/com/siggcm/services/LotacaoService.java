package br.com.siggcm.services;

import br.com.siggcm.dtos.LotacaoDTO;
import br.com.siggcm.entities.LotacaoEntity;
import br.com.siggcm.mappers.LotacaoMapper;
import br.com.siggcm.repositories.LotacaoRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LotacaoService {

    private final LotacaoRepository repository;

    public LotacaoService(
            LotacaoRepository repository
    ) {
        this.repository = repository;
    }

    public List<LotacaoDTO> listar() {
        return repository
                .findAll()
                .stream()
                .map(LotacaoMapper::toDTO)
                .toList();
    }

    public LotacaoDTO buscarPorId(
            String id
    ) {
        LotacaoEntity entity =
                repository.findById(
                        UUID.fromString(id)
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Lotação não encontrada."
                        )
                );

        return LotacaoMapper.toDTO(entity);
    }

    public LotacaoDTO criar(
            LotacaoDTO dto
    ) {
        UUID guardaId =
                UUID.fromString(dto.guardaId());

        if (
                 dto.ativo()
                 && repository.existsByGuardaIdAndAtivoTrue(guardaId)
        ) {
                throw new RuntimeException(
                        "Este guarda já possui uma lotação ativa."
                );
        }

        LotacaoEntity entity =
                LotacaoMapper.toEntity(dto);

        entity.setId(null);

        LotacaoEntity salvo =
                repository.save(entity);

        return LotacaoMapper.toDTO(salvo);
    } 

    public LotacaoDTO atualizar(
            String id,
            LotacaoDTO dto
    ) {
        LotacaoEntity entity =
                repository.findById(
                        UUID.fromString(id)
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Lotação não encontrada."
                        )
                );

        LotacaoMapper.atualizarEntity(
                entity,
                dto
        );

        LotacaoEntity salvo =
                repository.save(entity);

        return LotacaoMapper.toDTO(salvo);
    }

    public void remover(
            String id
    ) {
        UUID uuid =
                UUID.fromString(id);

        if (!repository.existsById(uuid)) {
            throw new RuntimeException(
                    "Lotação não encontrada."
            );
        }

        repository.deleteById(uuid);
    }

    public List<LotacaoDTO> listarPorGuarda(
            String guardaId
    ) {
        return repository
                .findByGuardaId(
                        UUID.fromString(guardaId)
                )
                .stream()
                .map(LotacaoMapper::toDTO)
                .toList();
    }

    public List<LotacaoDTO> listarPorPosto(
            String postoId
    ) {
        return repository
                .findByPostoId(
                        UUID.fromString(postoId)
                )
                .stream()
                .map(LotacaoMapper::toDTO)
                .toList();
    }
}