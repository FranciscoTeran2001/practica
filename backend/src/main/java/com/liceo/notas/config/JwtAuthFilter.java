package com.liceo.notas.config;

import com.liceo.notas.services.AuthService;
import com.liceo.notas.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();
        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token == null || !jwtService.validarToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token inválido o ausente");
            return;
        }

        // Extraer el ID del usuario del token
        String userId = jwtService.extraerIdUsuario(token);

        // Añadir el ID del usuario como atributo a la solicitud
        request.setAttribute("userId", userId);

        List<String> roles = jwtService.extraerRoles(token); // Debes implementar este método
        request.setAttribute("roles", roles);


        // El token es válido, continúa con la petición
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // Aquí excluyes rutas públicas como /login, /register, etc.
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/");
    }
}
