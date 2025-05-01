package com.liceo.notas.services;

import com.liceo.notas.dtos.MateriaDTO;
import java.util.List;
import java.util.Optional;

public interface MateriaService {
    MateriaDTO crearMateria(MateriaDTO dto);
    Optional<MateriaDTO> obtenerPorId(Integer id);
    List<MateriaDTO> listarTodas();
    Optional<MateriaDTO> actualizarMateria(Integer id, MateriaDTO dto);
    boolean eliminarMateria(Integer id);
}