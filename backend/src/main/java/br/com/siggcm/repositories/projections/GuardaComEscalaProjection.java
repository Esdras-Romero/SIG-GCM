package br.com.siggcm.repositories.projections;

import java.util.UUID;

public interface GuardaComEscalaProjection {

    UUID getId();

    String getNome();

    String getMatricula();

    Boolean getAtivo();

    String getTipoEscala();
}