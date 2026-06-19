package br.com.siggcm.entities;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "escalas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EscalaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID postoId;

    @Column(nullable = false)
    private Integer mes;

    @Column(nullable = false)
    private Integer ano;

    @Column(nullable = false)
    private String tipoEscala;

    @Column(nullable = false)
    private String status;

    @OneToMany(
            mappedBy = "escala",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<DiaEscalaEntity> dias =
            new ArrayList<>();
}
