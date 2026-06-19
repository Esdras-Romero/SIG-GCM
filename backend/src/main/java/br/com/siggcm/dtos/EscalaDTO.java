package br.com.siggcm.dtos;

import java.util.List;

public record EscalaDTO (

    String id,
    String postoId,
    Integer mes,
    Integer ano,
    String tipoEscala,
    String status,
    List<DiaEscalaDTO> dias
     
) {
    
}
