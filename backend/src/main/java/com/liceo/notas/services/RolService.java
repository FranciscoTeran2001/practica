package com.liceo.notas.services;

import com.liceo.notas.dtos.RolDTO;

import java.util.List;
import java.util.Optional;

public interface RolService {
    RolDTO crearRol(RolDTO dto);
    Optional<RolDTO> obtenerPorId(Integer id);
    List<RolDTO> listarTodos();
    Optional<RolDTO> actualizarRol(Integer id, RolDTO dto);
    boolean eliminarRol(Integer id);
    Optional<RolDTO> obtenerPorNombre(String nombre);
}