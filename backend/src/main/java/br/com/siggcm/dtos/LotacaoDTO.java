package br.com.siggcm.dtos;

public record LotacaoDTO (

    String id,
    String guardaId,
    String postoId,
    boolean ativo,
    String grupo,
    String turno
) {
    
}
