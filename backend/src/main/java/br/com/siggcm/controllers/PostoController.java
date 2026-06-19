package br.com.siggcm.controllers;

import br.com.siggcm.dtos.PostoDTO;
import br.com.siggcm.services.PostoService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/postos")
@CrossOrigin(origins = "http://localhost:4200")
public class PostoController {

    private final PostoService service;

    public PostoController(
            PostoService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<PostoDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public PostoDTO buscarPorId(
            @PathVariable String id
    ) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public PostoDTO criar(
            @RequestBody PostoDTO posto
    ) {
        return service.criar(posto);
    }

    @PutMapping("/{id}")
    public PostoDTO atualizar(
            @PathVariable String id,
            @RequestBody PostoDTO posto
    ) {
        return service.atualizar(
                id,
                posto
        );
    }

    @DeleteMapping("/{id}")
    public void remover(
            @PathVariable String id
    ) {
        service.remover(id);
    }
}