package br.com.siggcm.services;

import br.com.siggcm.dtos.PostoDTO;
import br.com.siggcm.entities.PostoEntity;
import br.com.siggcm.mappers.PostoMapper;
import br.com.siggcm.repositories.PostoRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostoService {

    private final PostoRepository repository;

    public PostoService(
            PostoRepository repository
    ) {
        this.repository = repository;
    }

    public List<PostoDTO> listar() {
        return repository
                .findAll()
                .stream()
                .map(PostoMapper::toDTO)
                .toList();
    }

    public PostoDTO buscarPorId(
            String id
    ) {
        PostoEntity entity =
                repository.findById(
                        UUID.fromString(id)
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Posto não encontrado."
                        )
                );

        return PostoMapper.toDTO(entity);
    }

    public PostoDTO criar(
            PostoDTO dto
    ) {
        PostoEntity entity =
                PostoMapper.toEntity(dto);

        entity.setId(null);

        PostoEntity salvo =
                repository.save(entity);

        return PostoMapper.toDTO(salvo);
    }

    public PostoDTO atualizar(
            String id,
            PostoDTO dto
    ) {
        PostoEntity entity =
                repository.findById(
                        UUID.fromString(id)
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Posto não encontrado."
                        )
                );

        PostoMapper.atualizarEntity(
                entity,
                dto
        );

        PostoEntity salvo =
                repository.save(entity);

        return PostoMapper.toDTO(salvo);
    }

    public void remover(
            String id
    ) {
        UUID uuid =
                UUID.fromString(id);

        if (!repository.existsById(uuid)) {
            throw new RuntimeException(
                    "Posto não encontrado."
            );
        }

        repository.deleteById(uuid);
    }
}