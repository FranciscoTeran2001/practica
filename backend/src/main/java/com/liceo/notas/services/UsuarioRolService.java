package com.liceo.notas.services;

import com.liceo.notas.dtos.UsuarioRolDTO;
import java.util.List;

public interface UsuarioRolService {
    UsuarioRolDTO asignarRolAUsuario(UsuarioRolDTO dto);
    List<UsuarioRolDTO> listarRolesPorUsuario(String idUsuario);
    List<UsuarioRolDTO> listarUsuariosPorRol(Integer idRol);
    void eliminarAsignacion(String idUsuario, Integer idRol);
    boolean existeAsignacion(String idUsuario, Integer idRol);
    List<UsuarioRolDTO> listarTodasLasAsignaciones();
}