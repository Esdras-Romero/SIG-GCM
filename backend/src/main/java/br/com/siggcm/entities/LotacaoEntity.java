package br.com.siggcm.entities;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "lotacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LotacaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID guardaId;

    @Column(nullable = false)
    private UUID postoId;

    @Column(nullable = false)
    private boolean ativo;

    @Column
    private String grupo;

    @Column
    private String turno;
    
}
