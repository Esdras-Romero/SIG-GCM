package br.com.siggcm.dtos;

import java.util.List;

public record TabelaEscalaMensalDTO(
        String postoId,
        String posto,
        String local,
        Integer mes,
        Integer ano,
        List<Integer> dias,
        List<String> diasSemana,
        List<LinhaTabelaEscalaDTO> linhas
) {
}
