package br.com.siggcm.entities;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "postos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String local;

    @Column(nullable = false)
    private String tipoEscala;

    @Column(nullable = false)
    private Integer quantidadeMinima;
}
