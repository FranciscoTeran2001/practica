package com.liceo.notas.entities;

import jakarta.persistence.*;  // Importa anotaciones de JPA (Jakarta Persistence API)
import lombok.Data;           // Lombok: genera getters, setters, toString

import java.time.LocalDate;
import java.util.List;

@Data  // Lombok: evita escribir métodos getters/setters manualmente
@Entity  // Indica que esta clase es una entidad JPA (se mapea a una tabla en BD)
@Table(name = "ANIO_LECTIVO")  // Nombre de la tabla en la base de datos
public class AnioLectivo {

    @Id  // Marca este campo como la clave primaria de la tabla
    @GeneratedValue(strategy = GenerationType.IDENTITY)   // Autoincremental en PostgreSQL
    @Column(name = "ID_ANIOLECTIVO")  // Nombre de la columna en la tabla
    private Integer id;  // Campo para el ID del año lectivo

    @Column(name = "FECHA_INICIO", nullable = false)  // Columna "FECHA_INICIO" (no nula)
    private LocalDate fechaInicio;  // Tipo de dato para fechas (java.time)

    @Column(name = "FECHA_FINAL", nullable = false)
    private LocalDate fechaFinal;

    @Column(name = "ESTADO_LECTIVO", nullable = false)
    private String estado;  // "Activo", "Inactivo"

    @OneToMany(mappedBy = "anioLectivo")
    // Relación 1-N con la entidad Curso:
    // - mappedBy: atributo en la clase Curso que hace referencia a AnioLectivo.
    // - cascade: operaciones (ej: eliminar) se propagan a los cursos asociados.
    // - fetch: carga perezosa (no trae cursos hasta que se accede a ellos).
    private List<Curso> cursos;  // Lista de cursos asociados al año lectivo
}