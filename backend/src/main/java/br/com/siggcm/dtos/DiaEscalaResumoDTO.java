package br.com.siggcm.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record DiaEscalaResumoDTO(
        Integer dia,
        LocalDate data,
        String diaSemana,
        String valor,
        boolean emServico,
        boolean extra,
        boolean folga,
        LocalTime horaInicio,
        LocalTime horaFim
) {}