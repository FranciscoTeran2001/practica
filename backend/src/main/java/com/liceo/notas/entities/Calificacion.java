package com.liceo.notas.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "CALIFICACION")
public class Calificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CALIFICACION")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "ID_ACTIVIDAD", nullable = false)
    private Actividad actividad;

    @Column(name = "NOTA", nullable = false)
    private Double nota;

    @Column(name = "COMENTARIO", length = 200)
    private String comentario;
}