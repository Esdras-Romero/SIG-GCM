package br.com.siggcm.services;

import br.com.siggcm.dtos.EscalaDTO;
import br.com.siggcm.dtos.GerarEscalaDTO;
import br.com.siggcm.entities.DiaEscalaEntity;
import br.com.siggcm.entities.EscalaEntity;
import br.com.siggcm.mappers.EscalaMapper;
import br.com.siggcm.repositories.EscalaRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;

@Service
public class EscalaService {

    private final EscalaRepository repository;

    public EscalaService(EscalaRepository repository) {
        this.repository = repository;
    }

    public List<EscalaDTO> listar() {
        return repository
                .findAll()
                .stream()
                .map(EscalaMapper::toDTO)
                .toList();
    }

    public EscalaDTO gerar(GerarEscalaDTO dto) {
        return switch (dto.tipoEscala()) {
            case "24x120" -> gerar24x120(dto);
            case "12x60" -> gerar12x60(dto);
            case "ADMINISTRATIVO" -> gerarAdministrativa(dto);
            default -> throw new RuntimeException("Tipo de escala inválido.");
        };
    }

    private EscalaDTO gerar24x120(GerarEscalaDTO dto) {
        String[] grupos = {"A", "B", "C", "D", "E", "F"};

        int indice = indiceGrupo(
                grupos,
                dto.grupoInicial() != null ? dto.grupoInicial() : "A"
        );

        EscalaEntity escala = criarEscalaBase(dto);

        int diasMes = YearMonth.of(dto.ano(), dto.mes()).lengthOfMonth();

        for (int dia = 1; dia <= diasMes; dia++) {
            String grupo = grupos[indice];

            DiaEscalaEntity item = criarDia(
                    escala,
                    LocalDate.of(dto.ano(), dto.mes(), dia),
                    grupo,
                    null,
                    LocalTime.of(7, 0),
                    LocalTime.of(7, 0),
                    false,
                    false
            );

            escala.getDias().add(item);

            indice = (indice + 1) % grupos.length;
        }

        return salvar(escala);
    }

    private EscalaDTO gerar12x60(GerarEscalaDTO dto) {
        String[] grupos = {"A", "B", "C"};

        int indiceDia = indiceGrupo(
                grupos,
                dto.grupoInicialDia() != null ? dto.grupoInicialDia() : "A"
        );

        int indiceNoite = indiceGrupo(
                grupos,
                dto.grupoInicialNoite() != null ? dto.grupoInicialNoite() : "A"
        );

        int[] contagemDia = new int[3];
        int[] contagemNoite = new int[3];

        EscalaEntity escala = criarEscalaBase(dto);

        int diasMes = YearMonth.of(dto.ano(), dto.mes()).lengthOfMonth();

        for (int dia = 1; dia <= diasMes; dia++) {
            LocalDate data = LocalDate.of(dto.ano(), dto.mes(), dia);

            String grupoDia = grupos[indiceDia];
            String grupoNoite = grupos[indiceNoite];

            contagemDia[indiceDia]++;
            contagemNoite[indiceNoite]++;

            boolean extraDia = contagemDia[indiceDia] > 10;
            boolean extraNoite = contagemNoite[indiceNoite] > 10;

            escala.getDias().add(
                    criarDia(
                            escala,
                            data,
                            grupoDia,
                            "DIA",
                            LocalTime.of(7, 0),
                            LocalTime.of(19, 0),
                            extraDia,
                            false
                    )
            );

            escala.getDias().add(
                    criarDia(
                            escala,
                            data,
                            grupoNoite,
                            "NOITE",
                            LocalTime.of(19, 0),
                            LocalTime.of(7, 0),
                            extraNoite,
                            false
                    )
            );

            indiceDia = (indiceDia + 1) % grupos.length;
            indiceNoite = (indiceNoite + 1) % grupos.length;
        }

        return salvar(escala);
    }

    private EscalaDTO gerarAdministrativa(GerarEscalaDTO dto) {
        EscalaEntity escala = criarEscalaBase(dto);

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

    private EscalaEntity criarEscalaBase(GerarEscalaDTO dto) {
        EscalaEntity escala = new EscalaEntity();

        escala.setPostoId(UUID.fromString(dto.postoId()));
        escala.setMes(dto.mes());
        escala.setAno(dto.ano());
        escala.setTipoEscala(dto.tipoEscala());
        escala.setStatus("GERADA");

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

    private int indiceGrupo(String[] grupos, String grupoInicial) {
        for (int i = 0; i < grupos.length; i++) {
            if (grupos[i].equalsIgnoreCase(grupoInicial)) {
                return i;
            }
        }

        return 0;
    }
}
