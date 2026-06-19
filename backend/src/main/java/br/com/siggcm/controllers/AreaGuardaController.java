package br.com.siggcm.controllers;

import br.com.siggcm.dtos.GuardaDTO;
import br.com.siggcm.dtos.LotacaoDTO;
import br.com.siggcm.dtos.PostoDTO;
import br.com.siggcm.dtos.CalendarioGuardaDTO;
import br.com.siggcm.services.AreaGuardaService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/area-guarda")
@CrossOrigin(origins = "http://localhost:4200")
public class AreaGuardaController {

    private final AreaGuardaService service;

    public AreaGuardaController(
            AreaGuardaService service
    ) {
        this.service = service;
    }

    @GetMapping("/{guardaId}/meus-dados")
    public GuardaDTO meusDados(
            @PathVariable String guardaId
    ) {
        return service.meusDados(guardaId);
    }

    @GetMapping("/{guardaId}/minha-lotacao")
    public LotacaoDTO minhaLotacao(
            @PathVariable String guardaId
    ) {
        return service.minhaLotacao(guardaId);
    }

    @GetMapping("/{guardaId}/meu-posto")
    public PostoDTO meuPosto(
            @PathVariable String guardaId
    ) {
        return service.meuPosto(guardaId);
    }

    @GetMapping("/{guardaId}/calendario")
    public CalendarioGuardaDTO calendario(
            @PathVariable String guardaId,
            @RequestParam Integer mes,
            @RequestParam Integer ano
    ) {
        return service.calendario(
            guardaId,
            mes,
            ano
        );
    }
}