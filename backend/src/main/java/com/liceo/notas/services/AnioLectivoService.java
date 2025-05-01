package com.liceo.notas.services;

import com.liceo.notas.dtos.AnioLectivoDTO;

import java.util.List;
import java.util.Optional;

public interface AnioLectivoService {
    // Se crea el año para la base de datos
    AnioLectivoDTO crearAnioLectivo(AnioLectivoDTO dto);

    // Leer por id el año
    Optional<AnioLectivoDTO> obtenerPorId(Integer id);
    //Leer toda la lista de años
    List<AnioLectivoDTO> listarTodos();
    //Leer la lista pero solo de los años activos
    List<AnioLectivoDTO> obtenerAniosActivos();

    // actualizar año
    Optional<AnioLectivoDTO> actualizarAnioLectivo(Integer id, AnioLectivoDTO dto);

    // eliminar año
    boolean eliminarAnioLectivo(Integer id);// Retorna DTO, no entidad
}