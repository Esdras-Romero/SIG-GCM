package br.com.siggcm.repositories;

import br.com.siggcm.entities.LotacaoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LotacaoRepository
        extends JpaRepository<LotacaoEntity, UUID> {

    List<LotacaoEntity> findByGuardaId(UUID guardaId);

    List<LotacaoEntity> findByPostoId(UUID postoId);

    boolean existsByGuardaIdAndAtivoTrue(UUID guardaId);

    long countByPostoIdAndAtivoTrue(UUID postoId);
}
