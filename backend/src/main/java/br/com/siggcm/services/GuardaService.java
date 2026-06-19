package br.com.siggcm.services;

import br.com.siggcm.dtos.GuardaDTO;
import br.com.siggcm.entities.GuardaEntity;
import br.com.siggcm.mappers.GuardaMapper;
import br.com.siggcm.repositories.GuardaRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GuardaService {

    private final GuardaRepository repository;

    public GuardaService(
            GuardaRepository repository
    ) {
        this.repository = repository;
    }

    public List<GuardaDTO> listar() {
        return repository
                .findAll()
                .stream()
                .map(GuardaMapper::toDTO)
                .toList();
    }

    public GuardaDTO buscarPorId(
            String id
    ) {
        GuardaEntity entity =
                repository.findById(
                        UUID.fromString(id)
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Guarda não encontrado."
                        )
                );

        return GuardaMapper.toDTO(entity);
    }

    public GuardaDTO criar(
            GuardaDTO dto
    ) {
        repository
                .findByMatricula(dto.matricula())
                .ifPresent(guarda -> {
                    throw new RuntimeException(
                            "Já existe guarda com esta matrícula."
                    );
                });

        GuardaEntity entity =
                GuardaMapper.toEntity(dto);

        entity.setId(null);

        GuardaEntity salvo =
                repository.save(entity);

        return GuardaMapper.toDTO(salvo);
    }

    public GuardaDTO atualizar(
            String id,
            GuardaDTO dto
    ) {
        GuardaEntity entity =
                repository.findById(
                        UUID.fromString(id)
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Guarda não encontrado."
                        )
                );

        GuardaMapper.atualizarEntity(
                entity,
                dto
        );

        GuardaEntity salvo =
                repository.save(entity);

        return GuardaMapper.toDTO(salvo);
    }

    public void remover(
            String id
    ) {
        UUID uuid =
                UUID.fromString(id);

        if (!repository.existsById(uuid)) {
            throw new RuntimeException(
                    "Guarda não encontrado."
            );
        }

        repository.deleteById(uuid);
    }
}