package com.liceo.notas.services;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey; // Cambio importante aquí
import io.jsonwebtoken.Jwts;

import java.util.List;

@Service
public class JwtService {

    private final SecretKey secretKey; // Cambio de Key a SecretKey

    // Inyecta la clave secreta desde application.properties
    public JwtService(@Value("${jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public boolean validarToken(String token) {
        try {
            // Para JJWT 0.12.x en adelante
            Jws<Claims> claimsJws = Jwts.parser()
                    .verifyWith(secretKey) // Ahora funciona correctamente
                    .build()
                    .parseSignedClaims(token);

            Claims claims = claimsJws.getPayload();

            // Opcional: validaciones adicionales
            // Date expiration = claims.getExpiration();
            // return expiration == null || !expiration.before(new Date());

            return true; // el token es válido
        } catch (JwtException | IllegalArgumentException e) {
            // Token inválido, expirado, mal formado, etc.
            return false;
        }
    }

    public Claims extraerClaims(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return claimsJws.getPayload();
        } catch (JwtException | IllegalArgumentException e) {
            throw new RuntimeException("Token inválido", e);
        }
    }

    public String extraerIdUsuario(String token) {
        Claims claims = extraerClaims(token);
        return claims.getSubject(); // O claims.get("id", String.class) dependiendo de cómo esté estructurado tu token
    }

    public List<String> extraerRoles(String token) {
        Claims claims = extraerClaims(token);
        Object roles = claims.get("roles");

        if (roles instanceof List<?>) {
            // Convierte la lista de objetos a lista de strings
            return ((List<?>) roles).stream()
                    .map(Object::toString)
                    .toList();
        }

        throw new RuntimeException("No se pudieron extraer los roles del token.");
    }


}