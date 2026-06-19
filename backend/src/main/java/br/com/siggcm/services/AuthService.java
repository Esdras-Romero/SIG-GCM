package br.com.siggcm.services;

import br.com.siggcm.dtos.LoginRequestDTO;
import br.com.siggcm.dtos.LoginResponseDTO;
import br.com.siggcm.entities.UsuarioEntity;
import br.com.siggcm.repositories.UsuarioRepository;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository repository;

    public AuthService(
            UsuarioRepository repository
    ) {
        this.repository = repository;
    }

    public LoginResponseDTO login(
            LoginRequestDTO request
    ) {
        UsuarioEntity usuario =
                repository.findByEmail(
                        request.email()
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Usuário não encontrado."
                        )
                );

        if (!usuario.isAtivo()) {
            throw new RuntimeException(
                    "Usuário inativo."
            );
        }

        if (!usuario.getSenha().equals(request.senha())) {
            throw new RuntimeException(
                    "Senha inválida."
            );
        }

        return new LoginResponseDTO(
                usuario.getId().toString(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getPerfil().name(),
                usuario.getGuardaId() != null
                        ? usuario.getGuardaId().toString()
                        : null
        );
    }
}