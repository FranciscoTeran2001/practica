package com.liceo.notas.services;

import com.liceo.notas.dtos.PromedioGeneralesEstudianteDTO;
import java.util.List;

public interface PromedioGeneralesEstudianteService {
    PromedioGeneralesEstudianteDTO guardarPromedio(PromedioGeneralesEstudianteDTO dto);
    PromedioGeneralesEstudianteDTO actualizarPromedio(PromedioGeneralesEstudianteDTO dto);
    void eliminarPromedio(Integer id);
    PromedioGeneralesEstudianteDTO obtenerPorId(Integer id);
    List<PromedioGeneralesEstudianteDTO> listarTodos();
    PromedioGeneralesEstudianteDTO obtenerPorEstudianteYCurso(String idUsuario, Integer idCurso);
}