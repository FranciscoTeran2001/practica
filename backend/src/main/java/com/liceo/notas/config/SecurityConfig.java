package com.liceo.notas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configuración de seguridad para la aplicación.
 * Esta clase define beans relacionados con la seguridad, específicamente
 * un codificador de contraseñas utilizando BCrypt.
 */
@Configuration
public class SecurityConfig {

    /**
     * Crea y configura un bean de tipo PasswordEncoder.
     * Este bean se utiliza para encriptar y verificar contraseñas en la aplicación,
     * utilizando el algoritmo BCryptPasswordEncoder.
     *
     * @return Una instancia de PasswordEncoder configurada con BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}