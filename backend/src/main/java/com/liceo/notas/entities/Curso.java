package com.liceo.notas.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data // Lombok: genera getters, setters, equals, hashCode, etc.
@Entity // Indica que esta clase es una entidad JPA
@Table(name = "CURSO") // Especifica el nombre de la tabla en la base de datos
public class Curso {
    @Id // Marca este campo como clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática de ID
    @Column(name = "ID_CURSO") // Nombre de la columna en la tabla
    private Integer id; // ID del curso

    // Relación Many-to-One con AnioLectivo
    @ManyToOne // Muchos cursos pueden pertenecer a un año lectivo
    @JoinColumn(name = "ID_ANIOLECTIVO", nullable = false) // Columna de join y no nula
    private AnioLectivo anioLectivo; // Referencia al año lectivo

    @Column(name = "NOMBRE_CURSO", nullable = false, length = 15) // Configuración de columna
    private String nombreCurso; // Nombre del curso

    /*// Relación One-to-Many con UsuarioCurso (tabla intermedia)
    @OneToMany(mappedBy = "curso") // mappedBy indica el campo dueño de la relación
    private List<UsuarioCurso> usuarios; // Lista de relaciones usuario-curso*/

    // Relación One-to-Many con CursoMateria (tabla intermedia)
    @OneToMany(mappedBy = "curso")
    private List<CursoMateria> materiasAsociadas;

}