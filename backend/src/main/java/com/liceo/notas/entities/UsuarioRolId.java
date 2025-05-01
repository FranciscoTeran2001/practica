package com.liceo.notas.entities;

import java.io.Serializable;
import java.util.Objects;

public class UsuarioRolId implements Serializable {

    private static final long serialVersionUID = 1L;

    private String usuario;  // Corresponde a ID_USUARIO en la tabla
    private Integer rol;     // Corresponde a ID_ROL en la tabla

    public UsuarioRolId() {
    }

    public UsuarioRolId(String usuario, Integer rol) {
        this.usuario = usuario;
        this.rol = rol;
    }

    // Getters y Setters
    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Integer getRol() {
        return rol;
    }

    public void setRol(Integer rol) {
        this.rol = rol;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioRolId that = (UsuarioRolId) o;
        return Objects.equals(usuario, that.usuario) &&
                Objects.equals(rol, that.rol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuario, rol);
    }

    @Override
    public String toString() {
        return "UsuarioRolId{" +
                "usuario='" + usuario + '\'' +
                ", rol=" + rol +
                '}';
    }
}