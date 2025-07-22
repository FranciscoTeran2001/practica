package com.liceo.notas.dtos.mappers;

import com.liceo.notas.dtos.ActividadDTO;
import com.liceo.notas.entities.Actividad;
import com.liceo.notas.entities.Parcial;

/**
 * Clase utilitaria para mapear entre entidades Actividad y DTOs ActividadDTO.
 * Proporciona métodos estáticos para conversión bidireccional.
 */
public class ActividadMapper {

    public static Actividad toEntity(ActividadDTO dto) {
        if (dto == null) return null;

        Actividad actividad = new Actividad();
        actividad.setId(dto.getId());
        actividad.setTipoActividad(dto.getTipoActividad());
        actividad.setFechaInicioEntrega(dto.getFechaInicioEntrega());
        actividad.setFechaFinEntrega(dto.getFechaFinEntrega());
        actividad.setDescripcion(dto.getDescripcion());
        actividad.setValorMaximo(dto.getValorMaximo());
        actividad.setTituloActividad(dto.getTituloActividad());

        if (dto.getIdParcial() != null) {
            Parcial parcial = new Parcial();
            parcial.setId(dto.getIdParcial());
            actividad.setParcial(parcial);
        }

        return actividad;
    }

    public static ActividadDTO toDTO(Actividad actividad) {
        if (actividad == null) return null;

        ActividadDTO dto = new ActividadDTO();
        dto.setId(actividad.getId());
        dto.setIdParcial(actividad.getParcial().getId());
        dto.setTipoActividad(actividad.getTipoActividad());
        dto.setFechaInicioEntrega(actividad.getFechaInicioEntrega());
        dto.setFechaFinEntrega(actividad.getFechaFinEntrega());
        dto.setDescripcion(actividad.getDescripcion());
        dto.setValorMaximo(actividad.getValorMaximo());
        dto.setTituloActividad(actividad.getTituloActividad());

        return dto;
    }
}