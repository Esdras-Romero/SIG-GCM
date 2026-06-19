package br.com.siggcm.entities;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "dias_escala")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiaEscalaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "escala_id", nullable = false)
    private EscalaEntity escala;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private UUID postoId;

    @Column(nullable = false)
    private String tipoEscala;

    @Column
    private String grupo;

    @Column
    private String turno;

    @Column
    private LocalTime horaInicio;

    @Column
    private LocalTime horaFim;

    @Column(nullable = false)
    private boolean extra;

    @Column(nullable = false)
    private boolean folga;
}