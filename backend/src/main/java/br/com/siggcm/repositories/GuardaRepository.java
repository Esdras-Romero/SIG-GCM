package br.com.siggcm.repositories;

import br.com.siggcm.entities.GuardaEntity;
import br.com.siggcm.repositories.projections.GuardaComEscalaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

@Repository
public interface GuardaRepository extends JpaRepository<GuardaEntity, UUID> {

    Optional<GuardaEntity> findByMatricula(String matricula);

    @Query("""
            SELECT g.id         AS id, 
                   g.nome       AS nome, 
                   g.matricula  AS matricula, 
                   p.tipoEscala AS tipoEscala,
                   g.ativo      AS ativo
                   
            FROM GuardaEntity g

            LEFT JOIN LotacaoEntity l 
                     ON l.guardaId = g.id 
                     AND l.ativo = true

            LEFT JOIN PostoEntity p 
                     ON p.id = l.postoId
            ORDER BY g.nome
           """)
    List<GuardaComEscalaProjection> findAllComEscalaDinamica();

    @Query("""

              SELECT

              g.id AS id,
              g.nome AS nome,
              g.matricula AS matricula,
              p.tipoEscala AS tipoEscala,
              g.ativo AS ativo

              FROM GuardaEntity g

              LEFT JOIN LotacaoEntity l
              ON l.guardaId=g.id
              AND l.ativo=true

              LEFT JOIN PostoEntity p
              ON p.id=l.postoId

              WHERE g.id=:id

              """)
              Optional<GuardaComEscalaProjection> buscarComEscala(UUID id);
}