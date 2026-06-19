package br.com.siggcm.mappers;

import br.com.siggcm.dtos.PostoDTO;
import br.com.siggcm.entities.PostoEntity;

import java.util.UUID;

public class PostoMapper {

    private PostoMapper() {
    }

    public static PostoDTO toDTO(
            PostoEntity entity
    ) {
        return new PostoDTO(
                entity.getId().toString(),
                entity.getNome(),
                entity.getLocal(),
                entity.getTipoEscala(),
                entity.getQuantidadeMinima()
        );
    }

    public static PostoEntity toEntity(
            PostoDTO dto
    ) {
        PostoEntity entity =
                new PostoEntity();

        if (dto.id() != null && !dto.id().isBlank()) {
            entity.setId(
                    UUID.fromString(dto.id())
            );
        }

        entity.setNome(dto.nome());
        entity.setLocal(dto.local());
        entity.setTipoEscala(dto.tipoEscala());
        entity.setQuantidadeMinima(dto.quantidadeMinima());

        return entity;
    }

    public static void atualizarEntity(
            PostoEntity entity,
            PostoDTO dto
    ) {
        entity.setNome(dto.nome());
        entity.setLocal(dto.local());
        entity.setTipoEscala(dto.tipoEscala());
        entity.setQuantidadeMinima(dto.quantidadeMinima());
    }
}