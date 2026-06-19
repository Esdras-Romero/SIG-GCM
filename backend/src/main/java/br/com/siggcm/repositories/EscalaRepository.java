package br.com.siggcm.repositories;

import br.com.siggcm.entities.EscalaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EscalaRepository
        extends JpaRepository<EscalaEntity, UUID> {

                List<EscalaEntity> findByPostoIdAndMesAndAno(
                        UUID postoId,
                        Integer mes,
                        Integer ano
                );
}
