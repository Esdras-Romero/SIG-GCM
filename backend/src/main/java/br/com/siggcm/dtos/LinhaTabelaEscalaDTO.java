package br.com.siggcm.dtos;

import java.util.List;

public record LinhaTabelaEscalaDTO(
        String guardaId,
        String matricula,
        String nome,
        String grupo,
        String turno,
        Integer totalServicos,
        List<DiaEscalaResumoDTO> dias
) {
}