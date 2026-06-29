package br.com.siggcm.services;

import br.com.siggcm.enums.PerfilUsuario;
import br.com.siggcm.dtos.GuardaDTO;
import br.com.siggcm.entities.GuardaEntity;
import br.com.siggcm.entities.LotacaoEntity;
import br.com.siggcm.entities.PostoEntity;
import br.com.siggcm.entities.UsuarioEntity;
import br.com.siggcm.mappers.GuardaMapper;
import br.com.siggcm.repositories.GuardaRepository;
import br.com.siggcm.repositories.UsuarioRepository;
import br.com.siggcm.repositories.LotacaoRepository;
import br.com.siggcm.repositories.PostoRepository;
import br.com.siggcm.repositories.projections.GuardaComEscalaProjection;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GuardaService {

    private final GuardaRepository repository;
    private final UsuarioRepository usuarioRepository;
    private final LotacaoRepository lotacaoRepository;
    private final PostoRepository postoRepository;

    public GuardaService( 
        GuardaRepository repository, 
        UsuarioRepository usuarioRepository,
        LotacaoRepository lotacaoRepository,
        PostoRepository postoRepository
    ) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
        this.lotacaoRepository = lotacaoRepository;
        this.postoRepository = postoRepository;
    }

    public List<GuardaDTO> listar() {

         return repository
            .findAllComEscalaDinamica()
            .stream()
            .map(guarda -> new GuardaDTO(

                    guarda.getId().toString(),
                    guarda.getNome(),
                    guarda.getMatricula(),
                    guarda.getTipoEscala(),
                    guarda.getAtivo()
            ))
            .toList();
    }
                

    public GuardaDTO buscarPorId(String id) {

        GuardaComEscalaProjection guarda =
            repository.buscarComEscala(UUID.fromString(id))
            .orElseThrow(() ->
                    new RuntimeException("Guarda não encontrado."));

        return new GuardaDTO(

                guarda.getId().toString(),
                guarda.getNome(),
                guarda.getMatricula(),
                guarda.getTipoEscala(),
                guarda.getAtivo()

        );
    }

        public GuardaDTO criar(
                GuardaDTO dto
        ) {
                repository
                        .findByMatricula(dto.matricula())
                        .ifPresent(guarda -> {
                                throw new RuntimeException(
                                        "Já existe guarda com esta matrícula."
                                );
                        });

                GuardaEntity entity =
                        GuardaMapper.toEntity(dto);

                entity.setId(null);

                GuardaEntity salvo =
                        repository.save(entity);

                criarUsuarioParaGuarda(salvo);

                return GuardaMapper.toDTO(salvo);
                }

                private void criarUsuarioParaGuarda(
                        GuardaEntity guarda
                ) {
                String email =
                        guarda.getMatricula().toLowerCase() + "@siggcm.com";

                if (usuarioRepository.existsByEmail(email)) {
                        return;
                }

                UsuarioEntity usuario =
                        new UsuarioEntity();

                usuario.setNome(guarda.getNome());
                usuario.setEmail(email);
                usuario.setSenha("123456");
                usuario.setPerfil(PerfilUsuario.GUARDA);
                usuario.setGuardaId(guarda.getId());
                usuario.setAtivo(true);

                usuarioRepository.save(usuario);
        }

    public GuardaDTO atualizar(
            String id,
            GuardaDTO dto
    ) {
        GuardaEntity entity =
                repository.findById(
                        UUID.fromString(id)
                ).orElseThrow(
                        () -> new RuntimeException(
                                "Guarda não encontrado."
                        )
                );

        GuardaMapper.atualizarEntity(
                entity,
                dto
        );

        GuardaEntity salvo =
                repository.save(entity);

        return GuardaMapper.toDTO(salvo);
    }

    public void remover(
            String id
    ) {
        UUID uuid =
                UUID.fromString(id);

        if (!repository.existsById(uuid)) {
            throw new RuntimeException(
                    "Guarda não encontrado."
            );
        }

        repository.deleteById(uuid);
    }

       private String buascarTipoEscala(UUID guardaId) {

        return lotacaoRepository
            .findByGuardaId(guardaId)
            .stream()
            .filter(LotacaoEntity::isAtivo)
            .findFirst()
            .flatMap(lotacao ->
                    postoRepository.findById(lotacao.getPostoId()))
            .map(PostoEntity::getTipoEscala)
            .orElse(null);
    }
}