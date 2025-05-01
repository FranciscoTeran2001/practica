package com.liceo.notas.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Data
@Entity
@Table(name = "ROL")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ROL")
    private Integer id;

    @Column(name = "NOMBRE_ROL", nullable = false, length = 20)
    private String nombre;

    @OneToMany(mappedBy = "rol")
    private List<UsuarioRol> usuarioRoles;
}