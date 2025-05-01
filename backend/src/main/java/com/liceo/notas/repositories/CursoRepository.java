package com.liceo.notas.repositories;

import com.liceo.notas.entities.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

// Extiende JpaRepository para operaciones CRUD básicas
public interface CursoRepository extends JpaRepository<Curso, Integer> {
    // Query method: Spring genera la consulta automáticamente
    // Busca cursos por ID de año lectivo
    List<Curso> findByAnioLectivoId(Integer idAnioLectivo);

    // Consulta JPQL personalizada para encontrar cursos de años activos
    @Query("SELECT c FROM Curso c WHERE c.anioLectivo.estado = 'Activo'")
    List<Curso> findCursosByAnioActivo();
}