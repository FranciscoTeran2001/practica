package com.liceo.notas.repositories;

import com.liceo.notas.entities.Calificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CalificacionRepository extends JpaRepository<Calificacion, Integer> {
    List<Calificacion> findByUsuarioIdUsuario(String idUsuario);
    List<Calificacion> findByActividadId(Integer idActividad);
    List<Calificacion> findByUsuarioIdUsuarioAndActividadParcialMateriaId(String idUsuario, Integer idMateria);
}