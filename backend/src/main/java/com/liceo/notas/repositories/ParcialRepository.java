package com.liceo.notas.repositories;

import com.liceo.notas.entities.Parcial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParcialRepository extends JpaRepository<Parcial, Integer> {
    List<Parcial> findByMateriaId(Integer idMateria);
    Optional<Parcial> findByMateriaIdAndNumeroParcial(Integer idMateria, Integer numeroParcial);
}