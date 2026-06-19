package br.com.siggcm.mappers;

import br.com.siggcm.dtos.DiaEscalaDTO;
import br.com.siggcm.dtos.EscalaDTO;
import br.com.siggcm.entities.DiaEscalaEntity;
import br.com.siggcm.entities.EscalaEntity;

public class EscalaMapper {

    private EscalaMapper() {
    }

    public static EscalaDTO toDTO(EscalaEntity entity) {
        return new EscalaDTO(
                entity.getId().toString(),
                entity.getPostoId().toString(),
                entity.getMes(),
                entity.getAno(),
                entity.getTipoEscala(),
                entity.getStatus(),
                entity.getDias()
                        .stream()
                        .map(EscalaMapper::toDiaDTO)
                        .toList()
        );
    }

    private static DiaEscalaDTO toDiaDTO(DiaEscalaEntity entity) {
        return new DiaEscalaDTO(
                entity.getId().toString(),
                entity.getData(),
                entity.getGrupo(),
                entity.getTurno(),
                entity.getHoraInicio(),
                entity.getHoraFim(),
                entity.isExtra(),
                entity.isFolga()
        );
    }
}
