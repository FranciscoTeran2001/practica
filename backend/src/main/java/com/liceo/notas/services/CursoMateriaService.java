package com.liceo.notas.services;

import com.liceo.notas.dtos.CursoMateriaDTO;
import java.util.List;

public interface CursoMateriaService {
    CursoMateriaDTO asociarCursoMateria(CursoMateriaDTO dto);
    List<CursoMateriaDTO> listarMateriasPorCurso(Integer idCurso);
    List<CursoMateriaDTO> listarCursosPorMateria(Integer idMateria);
    void eliminarAsociacion(Integer idCurso, Integer idMateria);
    boolean existeAsociacion(Integer idCurso, Integer idMateria);
    List<CursoMateriaDTO> listarTodasLasAsociaciones();

}