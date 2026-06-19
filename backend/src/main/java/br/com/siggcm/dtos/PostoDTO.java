package br.com.siggcm.dtos;

public record PostoDTO(
    String id,
    String nome,
    String local,
    String tipoEscala,
    Integer quantidadeMinima
) {
}
