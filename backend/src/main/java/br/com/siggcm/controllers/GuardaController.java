package br.com.siggcm.controllers;

import br.com.siggcm.dtos.GuardaDTO;
import br.com.siggcm.services.GuardaService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guardas")
@CrossOrigin(origins = "http://localhost:4200")
public class GuardaController {

    private final GuardaService service;

    public GuardaController(
            GuardaService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<GuardaDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public GuardaDTO buscarPorId(
            @PathVariable String id
    ) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public GuardaDTO criar(
            @RequestBody GuardaDTO guarda
    ) {
        return service.criar(guarda);
    }

    @PutMapping("/{id}")
    public GuardaDTO atualizar(
            @PathVariable String id,
            @RequestBody GuardaDTO guarda
    ) {
        return service.atualizar(
                id,
                guarda
        );
    }

    @DeleteMapping("/{id}")
    public void remover(
            @PathVariable String id
    ) {
        service.remover(id);
    }
}