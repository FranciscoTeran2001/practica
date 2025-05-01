package com.liceo.notas.entities;

import java.io.Serializable;
import java.util.Objects;

public class UsuarioCursoId implements Serializable {

    private static final long serialVersionUID = 1L;

    private String usuario;  // Corresponde a ID_USUARIO en la tabla
    private Integer curso;   // Corresponde a ID_CURSO en la tabla

    public UsuarioCursoId() {
    }

    public UsuarioCursoId(String usuario, Integer curso) {
        this.usuario = usuario;
        this.curso = curso;
    }

    // Getters y Setters
    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Integer getCurso() {
        return curso;
    }

    public void setCurso(Integer curso) {
        this.curso = curso;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsuarioCursoId that = (UsuarioCursoId) o;
        return Objects.equals(usuario, that.usuario) &&
                Objects.equals(curso, that.curso);
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuario, curso);
    }

    @Override
    public String toString() {
        return "UsuarioCursoId{" +
                "usuario='" + usuario + '\'' +
                ", curso=" + curso +
                '}';
    }
}