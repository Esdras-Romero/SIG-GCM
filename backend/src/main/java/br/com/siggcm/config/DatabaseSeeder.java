package br.com.siggcm.config;

import br.com.siggcm.entities.GuardaEntity;
import br.com.siggcm.entities.UsuarioEntity;
import br.com.siggcm.enums.PerfilUsuario;
import br.com.siggcm.repositories.GuardaRepository;
import br.com.siggcm.repositories.UsuarioRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner seedUsuarios(
            UsuarioRepository usuarioRepository,
            GuardaRepository guardaRepository
    ) {
        return args -> {

            if (!usuarioRepository.existsByEmail("admin@siggcm.com")) {

                UsuarioEntity admin =
                        new UsuarioEntity();

                admin.setNome("Administrador SIG-GCM");
                admin.setEmail("admin@siggcm.com");
                admin.setSenha("12345678");
                admin.setPerfil(PerfilUsuario.ADMINISTRADOR);
                admin.setGuardaId(null);
                admin.setAtivo(true);

                usuarioRepository.save(admin);
            }

            if (!usuarioRepository.existsByEmail("guarda@siggcm.com")) {

                GuardaEntity guarda =
                        new GuardaEntity();

                guarda.setNome("Guarda Usuário");
                guarda.setMatricula("GCM001");
                guarda.setTipoEscala("24x120");
                guarda.setAtivo(true);

                GuardaEntity guardaSalvo =
                        guardaRepository.save(guarda);

                UsuarioEntity usuarioGuarda =
                        new UsuarioEntity();

                usuarioGuarda.setNome("Guarda Usuário");
                usuarioGuarda.setEmail("guarda@siggcm.com");
                usuarioGuarda.setSenha("12345678");
                usuarioGuarda.setPerfil(PerfilUsuario.GUARDA);
                usuarioGuarda.setGuardaId(guardaSalvo.getId());
                usuarioGuarda.setAtivo(true);

                usuarioRepository.save(usuarioGuarda);
            }

        };
    }
}
