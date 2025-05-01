package com.liceo.notas.repositories;

import com.liceo.notas.entities.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface NotificacionRepository extends JpaRepository<Notificacion, Integer> {

    // Opción 1: Usando consulta JPQL explícita (recomendada)
    @Query("SELECT n FROM Notificacion n WHERE n.usuario.idUsuario = :idUsuario")
    List<Notificacion> findByUsuarioId(@Param("idUsuario") String idUsuario);

    // Opción 2: Usando la convención de nombres correcta
    List<Notificacion> findByUsuario_IdUsuario(String idUsuario);

    List<Notificacion> findByFechaNotificacion(LocalDate fecha);
}