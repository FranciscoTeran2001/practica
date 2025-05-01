package com.liceo.notas.entities;

import java.io.Serializable;
import java.util.Objects;

public class CursoMateriaId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer curso;  // Corresponde a ID_CURSO en la tabla
    private Integer materia;  // Corresponde a ID_MATERIA en la tabla

    // Constructor por defecto (requerido por JPA)
    public CursoMateriaId() {
    }

    // Constructor con parámetros
    public CursoMateriaId(Integer curso, Integer materia) {
        this.curso = curso;
        this.materia = materia;
    }

    // Getters y Setters
    public Integer getCurso() {
        return curso;
    }

    public void setCurso(Integer curso) {
        this.curso = curso;
    }

    public Integer getMateria() {
        return materia;
    }

    public void setMateria(Integer materia) {
        this.materia = materia;
    }

    // equals() - Obligatorio para claves compuestas
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CursoMateriaId that = (CursoMateriaId) o;

        return Objects.equals(curso, that.curso) &&
                Objects.equals(materia, that.materia);
    }

    // hashCode() - Obligatorio para claves compuestas
    @Override
    public int hashCode() {
        return Objects.hash(curso, materia);
    }

    // toString() - Opcional pero recomendado
    @Override
    public String toString() {
        return "CursoMateriaId{" +
                "curso=" + curso +
                ", materia=" + materia +
                '}';
    }
}