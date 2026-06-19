package br.com.siggcm.controllers;

import br.com.siggcm.dtos.LoginRequestDTO;
import br.com.siggcm.dtos.LoginResponseDTO;
import br.com.siggcm.services.AuthService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService service;

    public AuthController(
            AuthService service
    ) {
        this.service = service;
    }

    @PostMapping("/login")
    public LoginResponseDTO login(
            @RequestBody LoginRequestDTO request
    ) {
        return service.login(request);
    }
}