package com.liceo.notas.repositories;

import com.liceo.notas.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, String> { // ID es String

    // Busca por nickname (debe ser único)
    Optional<Usuario> findByNickname(String nickname);

    // Busca usuarios por estado
    List<Usuario> findByEstado(String estado);

    /*// Consulta personalizada para buscar usuarios por rol
    @Query("SELECT u FROM Usuario u JOIN u.roles r WHERE r.id = :rolId")
    List<Usuario> findByRolId(@Param("rolId") Integer rolId);*/

    // Consulta para login
    @Query("SELECT u FROM Usuario u WHERE u.nickname = :nickname AND u.contrasena = :contrasena")
    Optional<Usuario> findByNicknameAndContrasena(
            @Param("nickname") String nickname,
            @Param("contrasena") String contrasena);
}