package com.liceo.notas.services;

import com.liceo.notas.dtos.ActividadDTO;
import java.util.List;

public interface ActividadService {
    ActividadDTO crearActividad(ActividadDTO dto);
    List<ActividadDTO> listarPorParcial(Integer idParcial);
    ActividadDTO obtenerPorId(Integer id);
    void eliminarActividad(Integer id);
}