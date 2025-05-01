package com.liceo.notas.entities;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "CURSO_MATERIA")
@IdClass(CursoMateriaId.class)  // Clase embebida para la clave compuesta
public class CursoMateria {

    @Id
    @ManyToOne
    @JoinColumn(name = "ID_CURSO", nullable = false)
    private Curso curso;

    @Id
    @ManyToOne
    @JoinColumn(name = "ID_MATERIA", nullable = false)
    private Materia materia;
}

