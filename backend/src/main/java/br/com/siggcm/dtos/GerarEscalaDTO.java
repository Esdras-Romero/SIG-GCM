package br.com.siggcm.dtos;

public record GerarEscalaDTO(
    
        String postoId,
        Integer mes,
        Integer ano,
        String tipoEscala,
        String grupoInicial,
        String grupoInicialDia,
        String grupoInicialNoite
) {
}