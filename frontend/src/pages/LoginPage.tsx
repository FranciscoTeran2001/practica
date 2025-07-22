import * as React from 'react';
import { styled } from '@mui/material/styles';
import loginImg from '../assets/liceofondo.jpg';
import logo from '../assets/logo.png';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Stack,
    CircularProgress,
    Alert
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Estilos (se mantienen igual)
const ImageContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    overflow: 'hidden',
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block',
        width: '100%'
    },
}));

const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '50%'
    },
}));

const StyledPaper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
}));

export default function LoginPage() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        cedula: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Paso 1: Realizar el login
            const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    idUsuario: formData.cedula,
                    contrasena: formData.password
                }),
            });

            const loginData = await loginResponse.json();

            if (!loginResponse.ok) {
                throw new Error(loginData.message || 'Error al iniciar sesión');
            }


            // Paso 2: Obtener los roles del usuario
            const rolesResponse = await fetch(`${API_BASE_URL}/usuarios-roles/usuario/${loginData.idUsuario}`, {
                credentials: 'include'
            });

            if (!rolesResponse.ok) {
                throw new Error('Error al obtener los roles del usuario');
            }

            const userRoles = await rolesResponse.json();
            console.log("Respuesta completa del login:", userRoles);
            console.log("ID Usuario recibido:", userRoles.idRol);
            // Paso 3: Obtener los detalles de cada rol
            const rolesDetails = await Promise.all(
                userRoles.map(async (userRole: any) => {
                    const roleResponse = await fetch(`${API_BASE_URL}/roles/${userRole.idRol}`, {
                        credentials: 'include'

                    });
                    return roleResponse.json();
                })
            );

            // Paso 4: Determinar a qué página redirigir según el rol
            const roleNames = rolesDetails.map(role => role.nombre);


            // Redirigir según el rol
            if (roleNames.includes('Administrador')) {
                navigate('/PaginaInicioAdministrador');
            } else if (roleNames.includes('Profesor')) {
                navigate('/PaginaInicioProfesor');
            } else if (roleNames.includes('Estudiante')) {
                navigate('/PaginaInicioEstudiante');
            } else {
                // Si no tiene ningún rol conocido
                navigate('/sin-permisos');
            }

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Error al conectar con el servidor');
            } else {
                setError('Error al conectar con el servidor');
            }
            console.error('Error en el login:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#e3f2fd'
        }}>
            {/* Sección de la imagen (visible solo en pantallas medianas/grandes) */}
            <ImageContainer>
                <Box
                    component="img"
                    src={loginImg}
                    alt="Login"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </ImageContainer>

            {/* Sección del formulario */}
            <FormContainer>
                <Container maxWidth="xs" sx={{ padding: 0 }}>
                    <StyledPaper>
                        <Box
                            component="img"
                            src={logo}
                            alt="Logo"
                            sx={{
                                mx: 'auto',
                                mb: 5,
                                width: 120,
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />

                        <Typography component="h1" variant="h4" sx={{
                            textAlign: "center",
                            mb: 4,
                            fontWeight: 600,
                            color: 'text.primary'
                        }}>
                            Iniciar Sesión
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
                                {error}
                            </Alert>
                        )}

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ width: '100%' }}
                        >
                            <Stack spacing={3} width="100%">
                                <TextField
                                    label="Cédula"
                                    name="cedula"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    autoFocus
                                    size="medium"
                                    value={formData.cedula}
                                    onChange={handleChange}
                                    disabled={loading}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2
                                        }
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Contraseña"
                                    variant="outlined"
                                    size="medium"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={showPassword ? 'hide password' : 'show password'}
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    edge="end"
                                                    disabled={loading}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading}
                                    sx={{
                                        mt: 2,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        boxShadow: 'none',
                                        '&:hover': {
                                            boxShadow: 'none'
                                        }
                                    }}
                                    size="large"
                                >
                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Iniciar Sesión"
                                    )}
                                </Button>
                            </Stack>

                            <Box sx={{
                                mt: 3,
                                textAlign: 'center',
                                width: '100%'
                            }}>
                                <Button
                                    component={Link}
                                    to="/recuperacion"
                                    sx={{
                                        textTransform: "none",
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                        '&:hover': {
                                            color: 'primary.main',
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                    disabled={loading}
                                >
                                    ¿Olvidaste tu contraseña?
                                </Button>
                            </Box>
                        </Box>
                    </StyledPaper>
                </Container>
            </FormContainer>
        </Box>
    );
}