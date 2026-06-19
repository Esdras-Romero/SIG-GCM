package br.com.siggcm.dtos;

public record GuardaDTO (
    String id,
    String nome,
    String matricula,
    String tipoEscala,
    boolean ativo
) {
}
