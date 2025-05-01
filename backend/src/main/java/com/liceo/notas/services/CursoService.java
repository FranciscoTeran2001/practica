package com.liceo.notas.services;

import com.liceo.notas.dtos.CursoDTO;
import java.util.List;
import java.util.Optional;

public interface CursoService {
    CursoDTO crearCurso(CursoDTO dto);
    Optional<CursoDTO> obtenerPorId(Integer id);
    List<CursoDTO> listarTodos();
    List<CursoDTO> listarPorAnioLectivo(Integer idAnioLectivo);
    List<CursoDTO> listarCursosActivos();
    Optional<CursoDTO> actualizarCurso(Integer id, CursoDTO dto);
    boolean eliminarCurso(Integer id);
}