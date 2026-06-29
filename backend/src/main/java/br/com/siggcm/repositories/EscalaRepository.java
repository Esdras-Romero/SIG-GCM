package br.com.siggcm.repositories;

import br.com.siggcm.entities.EscalaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EscalaRepository
        extends JpaRepository<EscalaEntity, UUID> {

    List<EscalaEntity> findByPostoIdAndMesAndAno(
            UUID postoId,
            Integer mes,
            Integer ano
    );

    Optional<EscalaEntity> findTopByPostoIdOrderByAnoDescMesDesc(
            UUID postoId
    );
}
