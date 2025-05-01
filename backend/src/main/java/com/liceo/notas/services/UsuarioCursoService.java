package com.liceo.notas.services;

import com.liceo.notas.dtos.UsuarioCursoDTO;
import java.util.List;

public interface UsuarioCursoService {
    UsuarioCursoDTO asociarUsuarioCurso(UsuarioCursoDTO dto);
    List<UsuarioCursoDTO> listarCursosPorUsuario(String idUsuario);
    List<UsuarioCursoDTO> listarUsuariosPorCurso(Integer idCurso);
    void eliminarAsociacion(String idUsuario, Integer idCurso);
    boolean existeAsociacion(String idUsuario, Integer idCurso);
    List<UsuarioCursoDTO> listarTodasLasAsociaciones();
}