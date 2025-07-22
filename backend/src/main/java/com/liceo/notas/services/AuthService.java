package com.liceo.notas.services;

import com.liceo.notas.dtos.*;
import com.liceo.notas.entities.Usuario;
import com.liceo.notas.repositories.UsuarioRepository;
import com.liceo.notas.services.ServiceImpl.UsuarioServiceImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.crypto.SecretKey;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Servicio para gestionar la autenticación de usuarios del sistema.
 * Incluye funcionalidad para login estándar, autenticación MFA (Multi-Factor Authentication),
 * generación de tokens JWT y validación de credenciales.
 */
@Service
public class AuthService {
    @Value("${app.base-url}")
    private String baseUrl;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final MFAService mfaService;
    private final EmailService emailService;
    /**
     * Tiempo de expiración del código MFA en minutos.
     * Configurable mediante la propiedad app.mfa.code.expiration.minutes en application.properties.
     */
    @Value("${app.mfa.code.expiration.minutes:5}")
    private int mfaCodeExpirationMinutes;

    /**
     * Clave secreta utilizada para firmar los tokens JWT.
     * Debe ser segura y estar configurada en las propiedades de la aplicación.
     */
    @Value("${jwt.secret}")
    private String jwtSecret;

    /**
     * Tiempo de expiración de los tokens JWT en milisegundos.
     * Por defecto se establece en 86400000 ms = 24 horas.
     */
    @Value("${jwt.expirationMs:86400000}") // 24 horas por defecto
    private int jwtExpirationMs;

    private final String baseUrlFront = "http://localhost:5173";

    @Autowired
    private UsuarioServiceImpl usuarioService;

    @GetMapping("/verify-email")
    public ResponseEntity<EmailVerificacionResponse> verifyEmail(
            @RequestParam String token
    ) {
        boolean exito = usuarioService.verificarEmail(token);

        EmailVerificacionResponse response = new EmailVerificacionResponse();
        response.setExito(exito);
        response.setMensaje(exito ?
                "Email verificado exitosamente" :
                "Token inválido o expirado");

        return exito ?
                ResponseEntity.ok(response) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }


    /**
     * Valida la clave secreta JWT tras la inicialización del bean.
     * Lanza una excepción si la clave no es válida.
     */

    /**
     * Constructor para inyectar dependencias necesarias.
     *
     * @param usuarioRepository Repositorio para acceder a datos del usuario
     * @param passwordEncoder   Encoder para verificar contraseñas encriptadas
     * @param mfaService        Servicio para generar y validar códigos MFA
     * @param emailService      Servicio para enviar correos electrónicos con códigos MFA
     */
    public AuthService(UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder,
                       MFAService mfaService,
                       EmailService emailService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.mfaService = mfaService;
        this.emailService = emailService;
    }

    /**
     * Proceso completo de inicio de sesión para un usuario.
     * Verifica credenciales y aplica MFA si está habilitado.
     *
     * @param request Objeto {@link LoginRequest} con nickname y contraseña del usuario
     * @return {@link LoginResponse} con resultado del proceso de autenticación
     */
    public LoginResponse login(LoginRequest request, HttpServletResponse response)
    {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByIdUsuario(request.getIdUsuario());
        Usuario usuarioEmail = usuarioOpt.get();
        // Validación básica de los campos de entrada
        if (request.getIdUsuario() == null || request.getIdUsuario().trim().isEmpty()) {
            throw new IllegalArgumentException("El nickname es requerido");
        }
        if (request.getContrasena() == null || request.getContrasena().trim().isEmpty()) {
            throw new IllegalArgumentException("La contraseña es requerida");
        }
        // 2.Verificar si el email ya está verificado
        if (!usuarioEmail.isEmailVerificado()) {
            throw new RuntimeException("verifique su correo para poder iniciar sesión");
        }


        // Buscar usuario en la base de datos
        Usuario usuario = usuarioRepository.findByIdUsuario(request.getIdUsuario().trim())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));


        // Verificar estado del usuario
        if (!"Activo".equalsIgnoreCase(usuario.getEstado())) {
            throw new RuntimeException("El usuario no está activo");
        }
        if (!usuario.isEmailVerificado()) {
            throw new RuntimeException("Por favor verifica tu email primero");
        }
        // Verificar contraseña (ya está implementado correctamente)
        if (!passwordEncoder.matches(request.getContrasena().trim(), usuario.getContrasena())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        // Procesar MFA si está habilitado
        if (usuario.getMfaHabilitado() != null && usuario.getMfaHabilitado()) {
            return processMfaLogin(usuario);
        }

        // Generar token JWT
        String token = generateJwtToken(usuario);
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(Duration.ofMinutes(30))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new LoginResponse(true, "Autenticación exitosa", token,usuario.getIdUsuario());
    }

    /**
     * Verifica el código MFA introducido por el usuario durante el proceso de autenticación.
     *
     * @param request Objeto {@link MfaVerificationRequest} con nickname y código MFA
     * @return {@link MfaVerificationResponse} con resultado de la verificación MFA
     */
    public MfaVerificationResponse verifyMfaCode(MfaVerificationRequest request) {
        try {
            // 1. Validar campos de entrada
            if (request.getIdUsuario() == null || request.getIdUsuario().trim().isEmpty()) {
                return new MfaVerificationResponse(false, "Credenciales inválidas", null);
            }
            if (request.getCode() == null || request.getCode().trim().isEmpty()) {
                return new MfaVerificationResponse(false, "El código MFA es requerido", null);
            }

            // 2. Buscar usuario
            Usuario usuario = usuarioRepository.findByIdUsuario(request.getIdUsuario().trim())
                    .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

            // 3. Verificar si MFA está habilitado (antes de verificar el código)
            if (usuario.getMfaHabilitado() == null || !usuario.getMfaHabilitado()) {
                return new MfaVerificationResponse(false, "MFA no está habilitado para este usuario", null);
            }

            // 4. Validar código MFA
            if (!mfaService.isCodeValid(usuario.getMfaSecret(), request.getCode().trim(), usuario.getMfaCodeExpiration())) {
                return new MfaVerificationResponse(false, "Código de verificación inválido o expirado", null);
            }

            // En verifyMfaCode():
            String token = generateJwtToken(usuario); // Primero genera el token

            usuario.setMfaSecret(null);              // Luego limpia el código
            usuario.setMfaCodeExpiration(null);
            usuarioRepository.save(usuario);
            return new MfaVerificationResponse(true, "Verificación MFA exitosa", token);

        } catch (Exception e) {
            e.printStackTrace();
            return new MfaVerificationResponse(false, "Error al verificar el código: " + e.getMessage(), null);
        }
    }

    public boolean verifyEmailToken(String token) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByTokenVerificacion(token);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            usuario.setEmailVerificado(true);
            usuario.setTokenVerificacion(null);
            usuarioRepository.save(usuario);
            return true;
        }
        return false;
    }

    /**
     * Procesa el inicio de sesión cuando MFA está habilitado.
     * Genera un código temporal, lo asigna al usuario y lo envía por correo electrónico.
     *
     * @param usuario El usuario que intenta iniciar sesión
     * @return Respuesta indicando que se ha enviado el código MFA
     */
    private LoginResponse processMfaLogin(Usuario usuario) {
        String mfaCode = mfaService.generateCode();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(mfaCodeExpirationMinutes);

        usuario.setMfaSecret(mfaCode);
        usuario.setMfaCodeExpiration(expirationTime);
        usuarioRepository.save(usuario);

        emailService.sendMfaCode(usuario.getEmail(), mfaCode);

        return new LoginResponse(false, "Se ha enviado un código de verificación a tu email", null,null);
    }

    /**
     * Genera un token JWT para un usuario autenticado.
     *
     * @param usuario El usuario para quien se genera el token
     * @return Token JWT como cadena de texto
     */
    private String generateJwtToken(Usuario usuario) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
            List<String> roles = usuario.getUsuarioRoles().stream()
                    .map(usuarioRol -> usuarioRol.getRol().getNombre()) // Ajusta a cómo se llama el campo
                    .toList();
            return Jwts.builder()
                    .subject(usuario.getIdUsuario())
                    .claim("roles",roles)
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                    .signWith(key)
                    .compact();
        } catch (Exception e) {
            e.printStackTrace();  // Log del error para depuración
            throw new RuntimeException("Error al generar el token JWT: " + e.getMessage());
        }
    }

    /**
     * Valida un token JWT para verificar si es auténtico y no ha expirado.
     *
     * @param token El token JWT a validar
     * @return true si el token es válido, false en caso contrario
     */


    /**
     * Reenvía el email de verificación a un usuario no verificado
     *
     * @param email Email del usuario que solicita el reenvío
     * @return true si el email fue reenviado exitosamente, false si el usuario no existe o ya está verificado
     * @throws RuntimeException Si ocurre algún error durante el proceso
     */


    @Transactional
    public boolean reenviarEmailVerificacion(String nickname, String email) {
        // 1. Buscar usuario por nickname Y email
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNicknameAndEmail(nickname, email);

        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Credenciales no coinciden o usuario no existe");
        }

        Usuario usuario = usuarioOpt.get();

        // 2. Verificar si el email ya está verificado
        if (usuario.isEmailVerificado()) {
            throw new RuntimeException("El email ya está verificado");
        }

        // 3. Generar nuevo token si es necesario
        if (usuario.getTokenVerificacion() == null) {
            usuario.setTokenVerificacion(UUID.randomUUID().toString());
            usuarioRepository.save(usuario);
        }

        // 4. Reenviar email
        usuarioService.enviarEmailVerificacion(usuario);
        return true;
    }



    @Transactional
    public void generarTokenYEnviarCorreo(String idUsuario, String email) {
        Usuario usuario = usuarioRepository.findByIdUsuarioAndEmail(idUsuario, email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado o correo incorrecto"));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiracion = LocalDateTime.now().plusMinutes(15);

        usuario.setTokenRecuperacion(token);
        usuario.setExpiracionToken(expiracion);

        usuarioRepository.save(usuario);

        String resetUrl = baseUrlFront + "/formulario_recuperacion?token=" + token;

        emailService.sendHtmlEmail(
                email,
                "Recuperación de Contraseña",
                construirEmail(usuario.getNombres(), resetUrl)
        );
    }


    private String construirEmail(String nombre, String url) {
        return String.format("""
            <html>
                <body>
                    <h2>¡Hola, %s!</h2>
                    <p>Haz clic para restablecer tu contraseña:</p>
                    <a href="%s">Restablecer ahora</a>
                    <p><small>Este enlace expira en 15 minutos.</small></p>
                </body>
            </html>
            """, nombre, url);
    }





    @Transactional
    public void cambiarContrasena(String tokenRecuperacion, String nuevaContrasena) {
        // Buscar usuario por token
        Usuario usuario = usuarioRepository.findByTokenRecuperacion(tokenRecuperacion)
                .orElseThrow(() -> new IllegalArgumentException("Token de recuperación inválido"));

        // Validar que el token no haya expirado
        if (usuario.getExpiracionToken() == null || usuario.getExpiracionToken().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Token de recuperación ha expirado");
        }
        if (passwordEncoder.matches(nuevaContrasena, usuario.getContrasena())) {
            throw new IllegalArgumentException("La nueva contraseña no puede ser igual a la anterior");
        }

        // Encriptar y guardar nueva contraseña
        String nuevaContrasenaEncriptada = passwordEncoder.encode(nuevaContrasena);
        usuario.setContrasena(nuevaContrasenaEncriptada);

        // Limpiar token y expiración
        usuario.setTokenRecuperacion(null);
        usuario.setExpiracionToken(null);

        usuarioRepository.save(usuario);
    }







}