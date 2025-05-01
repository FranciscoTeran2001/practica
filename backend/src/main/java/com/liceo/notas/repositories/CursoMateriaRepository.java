package com.liceo.notas.repositories;

import com.liceo.notas.entities.CursoMateria;
import com.liceo.notas.entities.CursoMateriaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CursoMateriaRepository extends JpaRepository<CursoMateria, CursoMateriaId> {
    @Modifying
    @Transactional
    @Query("DELETE FROM CursoMateria cm WHERE cm.curso.id = :idCurso AND cm.materia.id = :idMateria")
    void deleteByCursoIdAndMateriaId(@Param("idCurso") Integer idCurso,
                                     @Param("idMateria") Integer idMateria);

    @Query("SELECT cm FROM CursoMateria cm WHERE cm.curso.id = :idCurso")
    List<CursoMateria> findByCursoId(@Param("idCurso") Integer idCurso);


    @Query("SELECT CASE WHEN COUNT(cm) > 0 THEN true ELSE false END " +
            "FROM CursoMateria cm WHERE cm.curso.id = :idCurso AND cm.materia.id = :idMateria")
    boolean existsByCursoIdAndMateriaId(@Param("idCurso") Integer idCurso,
                                        @Param("idMateria") Integer idMateria);

    // Buscar todos los cursos que tienen una materia específica
    @Query("SELECT cm FROM CursoMateria cm WHERE cm.materia.id = :idMateria")
    List<CursoMateria> findByMateriaId(@Param("idMateria") Integer idMateria);


}