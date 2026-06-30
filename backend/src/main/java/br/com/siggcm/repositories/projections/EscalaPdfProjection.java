package br.com.siggcm.repositories.projections;

import java.time.LocalDate;
import java.time.LocalTime;

public interface EscalaPdfProjection {
    
    String getPosto();

    String getTipoEscala();

    Integer getMes();

    Integer getAno();

    LocalDate getData();

    String getGrupo();

    String getTurno();

    LocalTime getHoraInicio();

    LocalTime getHoraFim();

    String getGuarda();
}
