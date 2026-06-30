package br.com.siggcm.controllers;

import br.com.siggcm.dtos.EscalaDTO;
import br.com.siggcm.dtos.GerarEscalaDTO;
import br.com.siggcm.dtos.UltimaEscalaDTO;
import br.com.siggcm.services.EscalaService;
import br.com.siggcm.services.EscalaPdfService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/escalas")
@CrossOrigin(origins = "http://localhost:4200")
public class EscalaController {

    private final EscalaService service;
    private final EscalaPdfService pdfService;

    public EscalaController(EscalaService service, EscalaPdfService pdfService) {
        this.service = service;
        this.pdfService = pdfService;
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

    @GetMapping("/posto/{postoId}/ultima")
    public UltimaEscalaDTO buscarUltimaEscala(
        @PathVariable String postoId
    ) {
        return service.buscarUltimaEscala(postoId);
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> gerarPdf(
            @PathVariable UUID id
    ) {

        byte[] pdf =
                pdfService.gerar(id);

        return ResponseEntity.ok()

                .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=escala.pdf"
                )

                .contentType(
                    MediaType.APPLICATION_PDF
                )

                .body(pdf);
    }
}
