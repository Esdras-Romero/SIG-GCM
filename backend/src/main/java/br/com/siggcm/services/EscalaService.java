package br.com.siggcm.services;

import br.com.siggcm.dtos.EscalaDTO;
import br.com.siggcm.dtos.GerarEscalaDTO;
import br.com.siggcm.dtos.UltimaEscalaDTO;
import br.com.siggcm.entities.DiaEscalaEntity;
import br.com.siggcm.entities.EscalaEntity;
import br.com.siggcm.entities.LotacaoEntity;
import br.com.siggcm.entities.PostoEntity;
import br.com.siggcm.mappers.EscalaMapper;
import br.com.siggcm.repositories.EscalaRepository;
import br.com.siggcm.repositories.LotacaoRepository;
import br.com.siggcm.repositories.PostoRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;
import java.util.Optional;
import java.util.Comparator;

@Service
public class EscalaService {

    private final EscalaRepository repository;
    private final PostoRepository postoRepository;
    private final LotacaoRepository lotacaoRepository;

    public EscalaService(
            EscalaRepository repository,
            PostoRepository postoRepository,
            LotacaoRepository lotacaoRepository
    ) {
        this.repository = repository;
        this.postoRepository = postoRepository;
        this.lotacaoRepository = lotacaoRepository;
    }

    public List<EscalaDTO> listar() {
        return repository
                .findAll()
                .stream()
                .map(EscalaMapper::toDTO)
                .toList();
    }

    public EscalaDTO gerar(GerarEscalaDTO dto) {

        UUID postoUuid = UUID.fromString(dto.postoId());

        validarEfetivoMinimo(dto.postoId());

        validarDuplicidade(postoUuid, dto.mes(), dto.ano());

        validarSequencia(postoUuid, dto.mes(), dto.ano());

        PostoEntity posto = postoRepository.findById(postoUuid)
                            .orElseThrow(() -> 
                                new RuntimeException("Posto não encontrado.")
                            );

        return switch (posto.getTipoEscala()) {
            case "24x120" -> gerar24x120(dto);
            case "12x60" -> gerar12x60(dto);
            case "ADMINISTRATIVO" -> gerarAdministrativa(dto);
            default -> throw new RuntimeException("Tipo de escala inválido.");
        };
    }

    private void validarEfetivoMinimo(String postoId) {

        UUID postoUuid = UUID.fromString(postoId);

        PostoEntity posto = 
            postoRepository.findById(postoUuid)
                        .orElseThrow(() -> 
                            new RuntimeException(
                                "posto não encontrado."));

        long efetivo =
                lotacaoRepository.countByPostoIdAndAtivoTrue(
                        postoUuid
                );

        if (efetivo < posto.getQuantidadeMinima()) {
            throw new RuntimeException("Posto possui efetivo insuficiente.");
        }
    }

    private void validarDuplicidade(
        UUID postoID, Integer mes, Integer ano
    ) {
        if (!repository.findByPostoIdAndMesAndAno(postoID, mes, ano)
                        .isEmpty()) {
                            throw new RuntimeException(
                                "Já existe uma escala para este posto neste mês/ano."
                            );
            }
    }

    private void validarSequencia(
        UUID postoId, Integer mes, Integer ano
    ) {
        Optional<EscalaEntity> ultimaEscala = repository
                                                .findTopByPostoIdOrderByAnoDescMesDesc(
                                                    postoId
                                                );
        if (ultimaEscala.isEmpty()) {
            return;
        }

        EscalaEntity ultima = ultimaEscala.get();

        int mesEsperado = ultima.getMes() + 1;
        int anoEsperado = ultima.getAno();

        if (mesEsperado > 12) {
            mesEsperado = 1;
            anoEsperado++;
        }

        if (!mes.equals(mesEsperado) || !ano.equals(anoEsperado)) {
            throw new RuntimeException(
                String.format("A próxima escala deve ser %02d/%d.",
                                    mesEsperado, anoEsperado
                )
            );
        }
    }

    private EscalaDTO gerar24x120(GerarEscalaDTO dto) {

        String[] grupos = {"A", "B", "C", "D", "E", "F"};

        String grupoInicial = obterGrupoInicial(
            dto.postoId(),
            dto.grupoInicial(),
            grupos
        );

        int indice = indiceGrupo(
                grupos,
                grupoInicial
        );

        EscalaEntity escala = criarEscalaBase(dto, grupoInicial);

        int diasMes = YearMonth.of(dto.ano(), dto.mes()).lengthOfMonth();

        for (int dia = 1; dia <= diasMes; dia++) {
            String grupo = grupos[indice];

            escala.getDias().add( criarDia(
                    escala,
                    LocalDate.of(dto.ano(), dto.mes(), dia),
                    grupo,
                    null,
                    LocalTime.of(7, 0),
                    LocalTime.of(7, 0),
                    false,
                    false
            )
            );

            indice = (indice + 1) % grupos.length;
        }

        return salvar(escala);
    }

    private EscalaDTO gerar12x60(GerarEscalaDTO dto) {

        String[] grupos = {"A", "B", "C"};

           String grupoInicial = obterGrupoInicial(
            dto.postoId(),
            dto.grupoInicial(),
            grupos
        );

        int indice = indiceGrupo(
                grupos,
                grupoInicial
        );

        int[] contagem = new int[3];

        EscalaEntity escala = criarEscalaBase(dto, grupoInicial);

        int diasMes = YearMonth.of(dto.ano(), dto.mes()).lengthOfMonth();

        for (int dia = 1; dia <= diasMes; dia++) {
            LocalDate data = LocalDate.of(dto.ano(), dto.mes(), dia);

            String grupo = grupos[indice];

            contagem[indice]++;

            boolean extra = contagem[indice] > 10;

            escala.getDias().add(
                    criarDia(
                            escala,
                            data,
                            grupo,
                            "DIA",
                            LocalTime.of(7, 0),
                            LocalTime.of(19, 0),
                            extra,
                            false
                    )
            );

            escala.getDias().add(
                    criarDia(
                            escala,
                            data,
                            grupo,
                            "NOITE",
                            LocalTime.of(19, 0),
                            LocalTime.of(7, 0),
                            extra,
                            false
                    )
            );

            indice = (indice + 1) % grupos.length;
        }

        return salvar(escala);
    }

    private EscalaDTO gerarAdministrativa(GerarEscalaDTO dto) {

        EscalaEntity escala = criarEscalaBase(dto, null);

        int diasMes = YearMonth.of(dto.ano(), dto.mes()).lengthOfMonth();

        for (int dia = 1; dia <= diasMes; dia++) {
            LocalDate data = LocalDate.of(dto.ano(), dto.mes(), dia);

            if (
                    data.getDayOfWeek().getValue() == 6 ||
                    data.getDayOfWeek().getValue() == 7
            ) {
                continue;
            }

            escala.getDias().add(
                    criarDia(
                            escala,
                            data,
                            null,
                            "MANHA",
                            LocalTime.of(7, 0),
                            LocalTime.of(13, 0),
                            false,
                            false
                    )
            );

            escala.getDias().add(
                    criarDia(
                            escala,
                            data,
                            null,
                            "TARDE",
                            LocalTime.of(13, 0),
                            LocalTime.of(19, 0),
                            false,
                            false
                    )
            );
        }

        return salvar(escala);
    }

    private EscalaEntity criarEscalaBase(GerarEscalaDTO dto, String grupoInicial) {

         PostoEntity posto = postoRepository
            .findById(UUID.fromString(dto.postoId())
            ).orElseThrow(() ->
                    new RuntimeException("Posto não encontrado.")
            );

        EscalaEntity escala = new EscalaEntity();

        escala.setPostoId(UUID.fromString(dto.postoId()));
        escala.setMes(dto.mes());
        escala.setAno(dto.ano());
        escala.setTipoEscala(posto.getTipoEscala());
        escala.setStatus("GERADA");
        escala.setGrupoInicial(grupoInicial != null ? grupoInicial: "A");

        return escala;
    }

    private DiaEscalaEntity criarDia(
            EscalaEntity escala,
            LocalDate data,
            String grupo,
            String turno,
            LocalTime horaInicio,
            LocalTime horaFim,
            boolean extra,
            boolean folga
    ) {
        DiaEscalaEntity dia = new DiaEscalaEntity();

        dia.setEscala(escala);
        dia.setData(data);
        dia.setPostoId(escala.getPostoId());
        dia.setTipoEscala(escala.getTipoEscala());
        dia.setGrupo(grupo);
        dia.setTurno(turno);
        dia.setHoraInicio(horaInicio);
        dia.setHoraFim(horaFim);
        dia.setExtra(extra);
        dia.setFolga(folga);

        return dia;
    }

    private EscalaDTO salvar(EscalaEntity escala) {
        EscalaEntity salva = repository.save(escala);
        return EscalaMapper.toDTO(salva);
    }

    private int indiceGrupo(String[] grupos, String grupo) {
        for (int i = 0; i < grupos.length; i++) {
            if (grupos[i].equalsIgnoreCase(grupo)) {
                return i;
            }
        }

        return 0;
    }

    private String obterGrupoInicial(
        String postoId,
        String grupoInformado,
        String[] grupos
    ) {

        Optional<EscalaEntity> ultimaEscala = repository.findTopByPostoIdOrderByAnoDescMesDesc(
                        UUID.fromString(postoId)
                );

        if (ultimaEscala.isEmpty()) {

            if (
                    grupoInformado != null &&
                    !grupoInformado.isBlank()
            ) {
                return grupoInformado;
            }

            return grupos[0];
        }

        String ultimoGrupo =
                obterUltimoGrupoDoMes(
                        ultimaEscala.get()
                );

        int indice =
                indiceGrupo(grupos, ultimoGrupo);
        return grupos[(indice + 1) % grupos.length];
    }

    private String obterUltimoGrupoDoMes(
        EscalaEntity escala
    ) {
        return escala.getDias()
                     .stream()
                     .filter(d -> d.getGrupo() != null)
                     .max(Comparator.comparing(DiaEscalaEntity::getData))
                     .map(DiaEscalaEntity::getGrupo)
                     .orElse(escala.getGrupoInicial());
    }

     public UltimaEscalaDTO buscarUltimaEscala(
            String postoId
    ) {

        Optional<EscalaEntity> ultimaEscala =
                repository.findTopByPostoIdOrderByAnoDescMesDesc(
                        UUID.fromString(postoId)
                );

        if (ultimaEscala.isEmpty()) {

            return new UltimaEscalaDTO(
                    false,
                    "A"
            );
        }

        EscalaEntity escala = ultimaEscala.get();

        String[] grupos;

         switch (escala.getTipoEscala()) {

            case "24x120":
                grupos = new String[]{
                        "A", "B", "C",
                        "D", "E", "F"
                };
                break;

            case "12x60":
                grupos = new String[]{
                        "A", "B", "C"
                };
                break;

            default:
                return new UltimaEscalaDTO(
                        true,
                        null
                );
        }

        String ultimoGrupo =
                obterUltimoGrupoDoMes(
                        escala
                );

        int indice =
                indiceGrupo(
                        grupos,
                        ultimoGrupo
                );
            
        String grupoSugerido =
                grupos[
                        (indice + 1)
                                % grupos.length
                ];

        return new UltimaEscalaDTO(
                true,
                grupoSugerido
        );  
    }
}
