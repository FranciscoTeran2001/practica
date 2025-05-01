package com.liceo.notas.dtos;

import com.liceo.notas.entities.PromedioGeneralesEstudiante;

/**
 * Mapper para convertir entre entidad PromedioGeneralesEstudiante y su DTO.
 */
public class PromedioGeneralesEstudianteMapper {

    public static PromedioGeneralesEstudianteDTO toDTO(PromedioGeneralesEstudiante entidad) {
        if (entidad == null) {
            throw new IllegalArgumentException("La entidad PromedioGeneralesEstudiante no puede ser nula");
        }

        PromedioGeneralesEstudianteDTO dto = new PromedioGeneralesEstudianteDTO();
        dto.setId(entidad.getId());
        dto.setIdUsuario(entidad.getIdUsuario());
        dto.setIdCurso(entidad.getCurso().getId());
        dto.setPromedioGeneral(entidad.getPromedioGeneral());
        dto.setComportamiento(entidad.getComportamiento());

        return dto;
    }

    public static PromedioGeneralesEstudiante toEntity(PromedioGeneralesEstudianteDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("El DTO PromedioGeneralesEstudianteDTO no puede ser nulo");
        }

        PromedioGeneralesEstudiante entidad = new PromedioGeneralesEstudiante();
        entidad.setId(dto.getId());
        entidad.setIdUsuario(dto.getIdUsuario());
        entidad.setPromedioGeneral(dto.getPromedioGeneral());
        entidad.setComportamiento(dto.getComportamiento());

        return entidad;
    }
}