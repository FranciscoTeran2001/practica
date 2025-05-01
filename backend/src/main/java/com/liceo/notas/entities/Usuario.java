package com.liceo.notas.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "USUARIO")
public class Usuario {
    @Id
    @Column(name = "ID_USUARIO", length = 10, nullable = false)
    private String idUsuario; // No es autoincremental, es un ID personalizado

    @Column(name = "NOMBRES_USUARIO", length = 50, nullable = false)
    private String nombres;

    @Column(name = "APELLIDOS_USUARIO", length = 50, nullable = false)
    private String apellidos;

    @Column(name = "NICKNAME_USUARIO", length = 30, nullable = false, unique = true)
    private String nickname;

    @Column(name = "CONTRASENA_USUARIO", length = 30, nullable = false)
    private String contrasena; // En producción usar @Transient y campo encriptado

    @Column(name = "ESTADO_USUARIO", length = 20, nullable = false)
    private String estado; // "Activo", "Inactivo"

    /*// Relación muchos-a-muchos con Rol a través de la tabla intermedia USUARIO_ROL
    @ManyToMany
    @JoinTable(
            name = "USUARIO_ROL",
            joinColumns = @JoinColumn(name = "ID_USUARIO"),
            inverseJoinColumns = @JoinColumn(name = "ID_ROL")
    )
    private List<Rol> roles;

    // Relación con cursos a través de la tabla intermedia USUARIO_CURSO
    @OneToMany(mappedBy = "usuario")
    private List<UsuarioCurso> cursos;*/
}