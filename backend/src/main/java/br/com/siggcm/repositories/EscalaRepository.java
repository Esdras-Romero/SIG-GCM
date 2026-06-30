package br.com.siggcm.repositories;

import br.com.siggcm.entities.EscalaEntity;
import br.com.siggcm.repositories.projections.EscalaPdfProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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

     @Query(value = """

        SELECT

        e.id,
        e.tipo_escala As tipoEscala,
        e.mes,
        e.ano,

        d.data,
        d.grupo,
        d.turno,
        d.hora_inicio AS horaInicio,
        d.hora_fim AS horaFim,

        g.nome AS guarda,

        p.nome AS posto

        FROM escalas e

        JOIN dias_escala d
        ON d.escala_id=e.id

        JOIN lotacoes l
        ON l.grupo=d.grupo

        JOIN guardas g
        ON g.id=l.guarda_id

        JOIN postos p
        ON p.id=e.posto_id

        WHERE e.id = :id

        ORDER BY d.data

        """, nativeQuery = true)
        List<EscalaPdfProjection> buscarDadosPdf(UUID id);
}
