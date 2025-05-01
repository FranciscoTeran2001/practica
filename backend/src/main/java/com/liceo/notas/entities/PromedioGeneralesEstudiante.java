package com.liceo.notas.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "PROMEDIOGENERALESTUDIANTE")
@Data
public class PromedioGeneralesEstudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PROMEDIO_GENERAL")
    private Integer id;

    @Column(name = "ID_USUARIO", nullable = false, length = 10)
    private String idUsuario;

    @ManyToOne
    @JoinColumn(name = "ID_CURSO", nullable = false)
    private Curso curso;

    @Column(name = "PROMEDIO_GENERAL", nullable = false)
    private Double promedioGeneral;

    @Column(name = "COMPORTAMIENTO", nullable = false, length = 1)
    private String comportamiento;
}