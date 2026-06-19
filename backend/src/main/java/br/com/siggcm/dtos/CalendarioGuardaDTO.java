package br.com.siggcm.dtos;

import java.util.List;

public record CalendarioGuardaDTO(
        String posto,
        String local,
        String tipoEscala,
        String grupo,
        String turno,
        Integer mes,
        Integer ano,
        List<DiaEscalaResumoDTO> dias
) {
}
