package br.com.siggcm.mappers;

import br.com.siggcm.dtos.GuardaDTO;
import br.com.siggcm.entities.GuardaEntity;

import java.util.UUID;

public class GuardaMapper {

    private GuardaMapper() {
    }

    public static GuardaDTO toDTO(
            GuardaEntity entity
    ) {
        return new GuardaDTO(
                entity.getId().toString(),
                entity.getNome(),
                entity.getMatricula(),
                entity.getTipoEscala(),
                entity.isAtivo()
        );
    }

    public static GuardaEntity toEntity(
            GuardaDTO dto
    ) {
        GuardaEntity entity =
                new GuardaEntity();

        if (dto.id() != null && !dto.id().isBlank()) {
            entity.setId(
                    UUID.fromString(dto.id())
            );
        }

        entity.setNome(dto.nome());
        entity.setMatricula(dto.matricula());
        entity.setTipoEscala(dto.tipoEscala());
        entity.setAtivo(dto.ativo());

        return entity;
    }

    public static void atualizarEntity(
            GuardaEntity entity,
            GuardaDTO dto
    ) {
        entity.setNome(dto.nome());
        entity.setMatricula(dto.matricula());
        entity.setTipoEscala(dto.tipoEscala());
        entity.setAtivo(dto.ativo());
    }
}
