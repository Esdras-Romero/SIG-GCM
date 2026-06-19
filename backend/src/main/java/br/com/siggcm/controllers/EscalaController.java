package br.com.siggcm.controllers;

import br.com.siggcm.dtos.EscalaDTO;
import br.com.siggcm.dtos.GerarEscalaDTO;
import br.com.siggcm.services.EscalaService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escalas")
@CrossOrigin(origins = "http://localhost:4200")
public class EscalaController {

    private final EscalaService service;

    public EscalaController(EscalaService service) {
        this.service = service;
    }

    @GetMapping
    public List<EscalaDTO> listar() {
        return service.listar();
    }

    @PostMapping("/gerar")
    public EscalaDTO gerar(
            @RequestBody GerarEscalaDTO dto
    ) {
        return service.gerar(dto);
    }
}
