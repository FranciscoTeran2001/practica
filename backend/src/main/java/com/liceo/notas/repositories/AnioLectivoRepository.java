package com.liceo.notas.repositories;

import com.liceo.notas.entities.AnioLectivo;
import org.springframework.data.jpa.repository.JpaRepository;  // Spring Data JPA

import java.util.List;
import java.util.Optional;  // Para manejar valores nulos de forma segura

// Extiende JpaRepository: proporciona CRUD básico sin implementación manual.
// Parámetros: <Entidad, Tipo de la clave primaria>
public interface AnioLectivoRepository extends JpaRepository<AnioLectivo, Integer> {

    // Query Method: Spring genera la consulta automáticamente.
    // Equivalente a: "SELECT * FROM ANIO_LECTIVO WHERE ESTADO_LECTIVO = ?1"
    List<AnioLectivo> findByEstado(String estado);

}