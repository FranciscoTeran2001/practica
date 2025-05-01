package com.liceo.notas.repositories;

import com.liceo.notas.entities.UsuarioRol;
import com.liceo.notas.entities.UsuarioRolId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UsuarioRolRepository extends JpaRepository<UsuarioRol, UsuarioRolId> {
    @Modifying
    @Transactional
    @Query("DELETE FROM UsuarioRol ur WHERE ur.usuario.idUsuario = :idUsuario AND ur.rol.id = :idRol")
    void deleteByUsuarioIdAndRolId(@Param("idUsuario") String idUsuario,
                                   @Param("idRol") Integer idRol);

    @Query("SELECT ur FROM UsuarioRol ur WHERE ur.usuario.idUsuario = :idUsuario")
    List<UsuarioRol> findByUsuarioId(@Param("idUsuario") String idUsuario);

    @Query("SELECT ur FROM UsuarioRol ur WHERE ur.rol.id = :idRol")
    List<UsuarioRol> findByRolId(@Param("idRol") Integer idRol);

    @Query("SELECT CASE WHEN COUNT(ur) > 0 THEN true ELSE false END " +
            "FROM UsuarioRol ur WHERE ur.usuario.idUsuario = :idUsuario AND ur.rol.id = :idRol")
    boolean existsByUsuarioIdAndRolId(@Param("idUsuario") String idUsuario,
                                      @Param("idRol") Integer idRol);
}