package br.com.siggcm.controllers;

import br.com.siggcm.dtos.LotacaoDTO;
import br.com.siggcm.services.LotacaoService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lotacoes")
@CrossOrigin(origins = "http://localhost:4200")
public class LotacaoController {

    private final LotacaoService service;

    public LotacaoController(
            LotacaoService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<LotacaoDTO> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public LotacaoDTO buscarPorId(
            @PathVariable String id
    ) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public LotacaoDTO criar(
            @RequestBody LotacaoDTO lotacao
    ) {
        return service.criar(lotacao);
    }

    @PutMapping("/{id}")
    public LotacaoDTO atualizar(
            @PathVariable String id,
            @RequestBody LotacaoDTO lotacao
    ) {
        return service.atualizar(
                id,
                lotacao
        );
    }

    @DeleteMapping("/{id}")
    public void remover(
            @PathVariable String id
    ) {
        service.remover(id);
    }

    @GetMapping("/guarda/{guardaId}")
    public List<LotacaoDTO> listarPorGuarda(
            @PathVariable String guardaId
    ) {
        return service.listarPorGuarda(guardaId);
    }

    @GetMapping("/posto/{postoId}")
    public List<LotacaoDTO> listarPorPosto(
            @PathVariable String postoId
    ) {
        return service.listarPorPosto(postoId);
    }
}
