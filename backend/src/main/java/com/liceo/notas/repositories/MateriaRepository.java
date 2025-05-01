package com.liceo.notas.repositories;

import com.liceo.notas.entities.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Integer> {
    // Busca materia por nombre (podría ser único)
    Optional<Materia> findByNombreMateria(String nombreMateria);
}