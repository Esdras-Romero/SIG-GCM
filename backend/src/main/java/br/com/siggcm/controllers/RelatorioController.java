package br.com.siggcm.controllers;

import br.com.siggcm.dtos.RelatorioEscalaDTO;
import br.com.siggcm.dtos.RelatorioResumoDTO;
import br.com.siggcm.services.RelatorioService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin(origins = "http://localhost:4200")
public class RelatorioController {

    private final RelatorioService service;

    public RelatorioController(
            RelatorioService service
    ) {
        this.service = service;
    }

    @GetMapping("/resumo")
    public RelatorioResumoDTO resumo() {
        return service.gerarResumo();
    }

    @GetMapping("/escalas/tipos")
    public List<RelatorioEscalaDTO> escalasPorTipo() {
        return service.gerarResumoEscalasPorTipo();
    }
}