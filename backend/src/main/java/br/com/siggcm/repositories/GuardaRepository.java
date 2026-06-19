package br.com.siggcm.repositories;

import br.com.siggcm.entities.GuardaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface GuardaRepository
        extends JpaRepository<GuardaEntity, UUID> {

    Optional<GuardaEntity> findByMatricula(String matricula);
}