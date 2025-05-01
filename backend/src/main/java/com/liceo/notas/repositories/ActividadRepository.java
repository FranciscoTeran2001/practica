package com.liceo.notas.repositories;

import com.liceo.notas.entities.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {
    List<Actividad> findByParcialId(Integer idParcial);
}