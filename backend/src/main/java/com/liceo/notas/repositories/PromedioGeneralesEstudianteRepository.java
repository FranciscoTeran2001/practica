package com.liceo.notas.repositories;

import com.liceo.notas.entities.PromedioGeneralesEstudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PromedioGeneralesEstudianteRepository extends JpaRepository<PromedioGeneralesEstudiante, Integer> {

    @Query("SELECT p FROM PromedioGeneralesEstudiante p WHERE p.idUsuario = :idUsuario AND p.curso.id = :idCurso")
    Optional<PromedioGeneralesEstudiante> findByIdUsuarioAndCursoId(
            @Param("idUsuario") String idUsuario,
            @Param("idCurso") Integer idCurso);

    boolean existsByIdUsuarioAndCursoId(String idUsuario, Integer idCurso);
}