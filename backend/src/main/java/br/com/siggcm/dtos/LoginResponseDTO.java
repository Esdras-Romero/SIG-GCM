package br.com.siggcm.dtos;

public record LoginResponseDTO (

    String id,
    String nome,
    String email,
    String perfil,
    String guardaId
) {
    
}
