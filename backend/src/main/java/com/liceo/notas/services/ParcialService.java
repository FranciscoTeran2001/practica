package com.liceo.notas.services;

import com.liceo.notas.dtos.ParcialDTO;

import java.util.List;
import java.util.Optional;

public interface ParcialService {
    ParcialDTO crearParcial(ParcialDTO dto);
    Optional<ParcialDTO> obtenerPorId(Integer id);
    List<ParcialDTO> listarTodos();
    List<ParcialDTO> listarPorMateria(Integer idMateria);
    Optional<ParcialDTO> actualizarParcial(Integer id, ParcialDTO dto);
    boolean eliminarParcial(Integer id);
}