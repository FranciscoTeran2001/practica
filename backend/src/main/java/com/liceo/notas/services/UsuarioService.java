package com.liceo.notas.services;

import com.liceo.notas.dtos.UsuarioDTO;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    UsuarioDTO crearUsuario(UsuarioDTO dto);
    Optional<UsuarioDTO> obtenerPorId(String id);
    List<UsuarioDTO> listarTodos();
    Optional<UsuarioDTO> actualizarUsuario(String id, UsuarioDTO dto);
    boolean eliminarUsuario(String id);
    List<UsuarioDTO> listarPorEstado(String estado);
}