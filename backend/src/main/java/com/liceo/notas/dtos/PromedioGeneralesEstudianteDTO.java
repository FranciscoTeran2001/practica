package com.liceo.notas.dtos;

import lombok.Data;

/**
 * DTO para representar el promedio general de un estudiante en un curso específico.
 * Contiene información sobre el promedio académico y comportamiento del estudiante.
 */
@Data
public class PromedioGeneralesEstudianteDTO {
    private Integer id;
    private String idUsuario;
    private Integer idCurso;
    private Double promedioGeneral;
    private String comportamiento;
}