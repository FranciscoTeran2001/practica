package com.liceo.notas.dtos;

import lombok.Data;
import java.util.List;

/**
 * DTO (Data Transfer Object) que representa un usuario del sistema.
 * Contiene los datos necesarios para la gestión de cuentas de usuario.
 *
 * <p>Se utiliza para transferir información entre las capas de la aplicación
 * y en las comunicaciones con el cliente.</p>
 *
 * <p>La anotación {@code @Data} de Lombok genera automáticamente:
 * <ul>
 *   <li>Métodos getter y setter para todos los campos</li>
 *   <li>Implementaciones de {@code equals()}, {@code hashCode()}</li>
 *   <li>Método {@code toString()}</li>
 *   <li>Constructor sin argumentos</li>
 * </ul>
 */
@Data
public class UsuarioDTO {
    /**
     * Identificador único del usuario en el sistema.
     * Ejemplo: cédula, documento de identidad o UUID.
     * Formato: String para mayor flexibilidad.
     */
    private String idUsuario;

    /**
     * Nombres del usuario.
     * Ejemplo: "María José" o "Carlos Andrés".
     * No debe contener números ni caracteres especiales.
     */
    private String nombres;

    /**
     * Apellidos del usuario.
     * Ejemplo: "García López" o "Pérez Rodríguez".
     * No debe contener números ni caracteres especiales.
     */
    private String apellidos;

    /**
     * Nombre de usuario para autenticación (login).
     * Debe ser único en el sistema.
     * Ejemplo: "mgarci23" o "cperez".
     */
    private String nickname;

    /**
     * Contraseña del usuario.
     * En entornos de producción, siempre debe almacenarse encriptada.
     * Debe cumplir con políticas de seguridad mínimas:
     * - Mínimo 8 caracteres
     * - Letras mayúsculas/minúsculas
     * - Números
     * - Caracteres especiales
     */
    private String contrasena;

    /**
     * Estado actual del usuario en el sistema.
     * Valores típicos: "ACTIVO", "INACTIVO", "PENDIENTE".
     * Controla si el usuario puede acceder al sistema.
     */
    private String estado;

    /**
     * Lista de identificadores de roles asignados al usuario.
     * Cada ID debe corresponder a un rol existente en el sistema.
     * Ejemplo: [1, 3] para roles "ADMIN" y "PROFESOR".
     */
    private List<Integer> roles;
}