package com.liceo.notas.controllers;

import com.liceo.notas.dtos.*;
import com.liceo.notas.entities.Usuario;
import com.liceo.notas.repositories.UsuarioRepository;
import com.liceo.notas.services.AuthService;
import com.liceo.notas.services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;


    public AuthController(AuthService authService,JwtService jwtService, UsuarioRepository usuarioRepository) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        LoginResponse loginResponse = authService.login(request, response);
        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping("/verify-mfa")
    public ResponseEntity<MfaVerificationResponse> verifyMfaCode(@RequestBody MfaVerificationRequest request) {
        MfaVerificationResponse mfaResponse = authService.verifyMfaCode(request);

        if (!mfaResponse.isSuccess()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mfaResponse);
        }

        ResponseCookie cookie = ResponseCookie.from("jwt", mfaResponse.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(Duration.ofHours(1))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(mfaResponse);
    }



    @GetMapping("/verify-email")
    public ResponseEntity<Map<String, Object>> verifyEmail(@RequestParam String token) {
        boolean exito = authService.verifyEmailToken(token);

        Map<String, Object> response = new HashMap<>();
        response.put("success", exito);
        response.put("message", exito ? "Email verificado exitosamente" : "Token inválido o expirado");

        return exito
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @PostMapping("/resend-verification-email")
    public ResponseEntity<Map<String, Object>> resendVerificationEmail(
            @Valid @RequestBody ResendVerificationEmailRequest request) {

        try {
            boolean exito = authService.reenviarEmailVerificacion(
                    request.getNickname(),
                    request.getEmail()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", exito);
            response.put("message", exito
                    ? "Correo de verificación reenviado"
                    : "No se pudo reenviar el correo");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/solicitar-recuperacion")
    public ResponseEntity<?> solicitarRecuperacion(@RequestBody UsuarioDTO request) {
        try {
            authService.generarTokenYEnviarCorreo(request.getIdUsuario(), request.getEmail());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Si los datos son correctos, recibirás un correo"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }



    @PostMapping("/restablecer-contrasena")
    public ResponseEntity<?> restablecerContrasena(@RequestBody Map<String, String> request) {
        String nuevaContrasena = request.get("nuevaContrasena");
        String tokenRecuperacion = request.get("tokenRecuperacion"); // <-- agrega este campo

        try {
            authService.cambiarContrasena(tokenRecuperacion, nuevaContrasena);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Contraseña actualizada exitosamente"
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }



    @PostMapping("/validate-token")
    public ResponseEntity<Map<String, Object>> validateToken(@CookieValue(name = "jwt", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Token no proporcionado"
            ));
        }

        boolean esValido = jwtService.validarToken(token);

        if (!esValido) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Token inválido o expirado"
            ));
        }
        List<String> roles = jwtService.extraerRoles(token);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Token válido",
                "roles", roles
        ));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0) // <= Esto elimina la cookie
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok("Sesión cerrada");
    }


}