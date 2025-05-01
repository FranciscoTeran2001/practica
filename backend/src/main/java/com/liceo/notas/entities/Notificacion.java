package com.liceo.notas.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "NOTIFICACIONES")
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_NOTIFICACION")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "MENSAJE_NOTIFICACION", nullable = false, length = 100)
    private String mensaje;

    @Column(name = "FECHA_NOTIFICACION", nullable = false)
    private LocalDate fechaNotificacion;
}