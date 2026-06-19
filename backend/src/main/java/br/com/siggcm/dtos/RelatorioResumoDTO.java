package br.com.siggcm.dtos;

public record RelatorioResumoDTO(
        long totalGuardas,
        long totalPostos,
        long totalLotacoes,
        long totalEscalas,
        long guardasAtivos,
        long lotacoesAtivas
) {
}
