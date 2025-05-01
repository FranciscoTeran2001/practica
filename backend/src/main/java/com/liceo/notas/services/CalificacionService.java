package com.liceo.notas.services;

import com.liceo.notas.dtos.CalificacionDTO;
import java.util.List;

public interface CalificacionService {
    CalificacionDTO registrarCalificacion(CalificacionDTO dto);
    List<CalificacionDTO> listarPorUsuario(String idUsuario);
    List<CalificacionDTO> listarPorActividad(Integer idActividad);
    CalificacionDTO actualizarCalificacion(Integer id, CalificacionDTO dto);
}