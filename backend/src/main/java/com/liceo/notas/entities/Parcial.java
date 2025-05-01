package com.liceo.notas.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;


@Data
@Entity
@Table(name = "PARCIAL")
public class Parcial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PARCIAL")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ID_MATERIA", nullable = false)
    private Materia materia;

    @Column(name = "NUMERO_PARCIAL", nullable = false)
    private Integer numeroParcial;

    @Column(name = "FECHA_INICIO", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "FECHA_FIN", nullable = false)
    private LocalDate fechaFin;

    /*@OneToMany(mappedBy = "parcial")
    private List<Actividad> actividades;*/
}