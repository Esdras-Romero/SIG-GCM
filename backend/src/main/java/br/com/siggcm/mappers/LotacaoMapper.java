package br.com.siggcm.mappers;

import br.com.siggcm.dtos.LotacaoDTO;
import br.com.siggcm.entities.LotacaoEntity;

import java.util.UUID;

public class LotacaoMapper {

    private LotacaoMapper() {
    }

    public static LotacaoDTO toDTO(
            LotacaoEntity entity
    ) {
        return new LotacaoDTO(
                entity.getId().toString(),
                entity.getGuardaId().toString(),
                entity.getPostoId().toString(),
                entity.isAtivo(),
                entity.getGrupo(),
                entity.getTurno()
        );
    }

    public static LotacaoEntity toEntity(
            LotacaoDTO dto
    ) {
        LotacaoEntity entity =
                new LotacaoEntity();

        if (dto.id() != null && !dto.id().isBlank()) {
            entity.setId(
                    UUID.fromString(dto.id())
            );
        }

        entity.setGuardaId(
                UUID.fromString(dto.guardaId())
        );

        entity.setPostoId(
                UUID.fromString(dto.postoId())
        );

        entity.setAtivo(dto.ativo());
        entity.setGrupo(dto.grupo());
        entity.setTurno(dto.turno());

        return entity;
    }

    public static void atualizarEntity(
            LotacaoEntity entity,
            LotacaoDTO dto
    ) {
        entity.setGuardaId(
                UUID.fromString(dto.guardaId())
        );

        entity.setPostoId(
                UUID.fromString(dto.postoId())
        );

        entity.setAtivo(dto.ativo());
        entity.setGrupo(dto.grupo());
        entity.setTurno(dto.turno());
    }
}
