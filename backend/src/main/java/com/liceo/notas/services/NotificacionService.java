package com.liceo.notas.services;

import com.liceo.notas.dtos.NotificacionDTO;
import com.liceo.notas.entities.Notificacion;

import java.time.LocalDate;
import java.util.List;

public interface NotificacionService{
    NotificacionDTO crearNotificacion(NotificacionDTO dto);
    List<NotificacionDTO> listarPorUsuario(String idUsuario);
    List<NotificacionDTO> listarPorFecha(LocalDate fecha);
    boolean eliminarNotificacion(Integer id);
}