package com.liceo.notas.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "MATERIA")
public class Materia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_MATERIA")
    private Integer id;

    @Column(name = "NOMBRE_MATERIA", nullable = false, length = 30)
    private String nombreMateria;

   /// Relación con cursos (tabla intermedia CURSO_MATERIA)
   @OneToMany(mappedBy = "materia")
   private List<CursoMateria> cursosAsociados;

    // Relación con parciales
    @OneToMany(mappedBy = "materia")
    private List<Parcial> parciales;
}