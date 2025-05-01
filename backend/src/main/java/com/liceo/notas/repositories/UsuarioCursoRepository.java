package com.liceo.notas.repositories;

import com.liceo.notas.entities.UsuarioCurso;
import com.liceo.notas.entities.UsuarioCursoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UsuarioCursoRepository extends JpaRepository<UsuarioCurso, UsuarioCursoId> {
    @Modifying
    @Transactional
    @Query("DELETE FROM UsuarioCurso uc WHERE uc.usuario.idUsuario = :idUsuario AND uc.curso.id = :idCurso")
    void deleteByUsuarioIdAndCursoId(@Param("idUsuario") String idUsuario,
                                     @Param("idCurso") Integer idCurso);

    @Query("SELECT uc FROM UsuarioCurso uc WHERE uc.usuario.idUsuario = :idUsuario")
    List<UsuarioCurso> findByUsuarioId(@Param("idUsuario") String idUsuario);

    @Query("SELECT uc FROM UsuarioCurso uc WHERE uc.curso.id = :idCurso")
    List<UsuarioCurso> findByCursoId(@Param("idCurso") Integer idCurso);

    @Query("SELECT CASE WHEN COUNT(uc) > 0 THEN true ELSE false END " +
            "FROM UsuarioCurso uc WHERE uc.usuario.idUsuario = :idUsuario AND uc.curso.id = :idCurso")
    boolean existsByUsuarioIdAndCursoId(@Param("idUsuario") String idUsuario,
                                        @Param("idCurso") Integer idCurso);
}