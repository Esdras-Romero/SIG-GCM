package br.com.siggcm.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record DiaEscalaDTO ( 

    String id,
    LocalDate data,
    String grupo,
    String turno,
    LocalTime horaInicio,
    LocalTime horaFim,
    boolean extra,
    boolean folga
) {
    
}
