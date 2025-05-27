import {
  FormControlLabel, RadioGroup, FormLabel, Container, Typography,
  Box, TextField, FormControl, InputLabel,
  InputAdornment, IconButton, OutlinedInput, Radio, Button,
  Paper, Avatar, Grid, Alert, CircularProgress
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navbar1 } from "../components/navbar1";
import React, { useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from "react-router-dom";

export const RegistrarUsuario = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    cedula: '',
    username: '',
    correo: '',
    password: '',
    tipoUsuario: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [correoError, setCorreoError] = useState(false);

  // Manejadores de cambios
  const handleCedulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setFormData(prev => ({...prev, cedula: value}));
    }
  };

  const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData(prev => ({...prev, correo: value}));
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ec|edu\.ec)$/;
    setCorreoError(!correoRegex.test(value));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTipoUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      tipoUsuario: event.target.value
    }));
  };

  // Mapeo de tipo de usuario a ID de rol
  const getRolId = (tipoUsuario: string): number => {
    switch(tipoUsuario) {
      case 'administrador': return 1;
      case 'profesor': return 2;
      case 'estudiante': return 3;
      default: return 0;
    }
  };

  // Envío del formulario
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  // Validaciones
  if (!formData.tipoUsuario) {
    setError("Debe seleccionar un tipo de usuario");
    setLoading(false);
    return;
  }

  if (formData.cedula.length !== 10) {
    setError("La cédula debe tener 10 dígitos");
    setLoading(false);
    return;
  }

  try {
    // 1. Registrar el usuario
    const usuarioResponse = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idUsuario: formData.cedula,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        nickname: formData.username,
        contrasena: formData.password,
        estado: "ACTIVO",
        email: formData.correo,
        emailVerificado: false,
        mfaHabilitado: false
      }),
    });

    if (!usuarioResponse.ok) {
      const errorData = await usuarioResponse.json();
      throw new Error(errorData.message || 'Error al registrar usuario');
    }

    // 2. Asignar el rol - IMPORTANTE: Cambios aquí
    const rolId = {
      'administrador': 1,
      'profesor': 2,
      'estudiante': 3
    }[formData.tipoUsuario];

    const rolResponse = await fetch(`${API_BASE_URL}/usuarios-roles`, { // Nota el cambio en la URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idUsuario: formData.cedula,
        idRol: rolId
      }),
    });

    const rolResponseData = await rolResponse.json();
    
    if (!rolResponse.ok) {
      console.error('Detalles del error:', rolResponseData);
      throw new Error(rolResponseData.message || 'Error al asignar rol al usuario');
    }

    setSuccess("Usuario registrado exitosamente con rol asignado");
    setTimeout(() => navigate('/'), 2000);

  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Error desconocido al registrar usuario');
    }
    console.error('Error completo:', err);
  } finally {
    setLoading(false);
  }
};

  const commonInputProps = {
    sx: { borderRadius: 2, minHeight: '56px' }
  };

  return (
    <>
      <Navbar1 />

      <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 60, height: 60 }}>
              <PersonAddIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Registrar Nuevo Usuario
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Complete todos los campos requeridos
            </Typography>
          </Box>

          {/* Mostrar mensajes de error/success */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Fila 1 - Nombres y Apellidos */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombres"
                  name="nombres"
                  variant="outlined"
                  value={formData.nombres}
                  onChange={handleChange}
                  InputProps={commonInputProps}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  name="apellidos"
                  variant="outlined"
                  value={formData.apellidos}
                  onChange={handleChange}
                  InputProps={commonInputProps}
                  required
                />
              </Grid>

              {/* Fila 2 - Cédula y Nombre de Usuario */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Cédula"
                  name="cedula"
                  variant="outlined"
                  value={formData.cedula}
                  onChange={handleCedulaChange}
                  InputProps={commonInputProps}
                  required
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre de Usuario"
                  name="username"
                  variant="outlined"
                  value={formData.username}
                  onChange={handleChange}
                  InputProps={commonInputProps}
                  required
                />
              </Grid>

              {/* Fila 3 - Correo Electrónico (ancho completo) */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  name="correo"
                  variant="outlined"
                  value={formData.correo}
                  onChange={handleCorreoChange}
                  error={correoError}
                  helperText={correoError ? "Ingrese un correo válido (ejemplo@dominio.com)" : ""}
                  InputProps={commonInputProps}
                  required
                />
              </Grid>

              {/* Fila 4 - Contraseña (ancho completo) */}
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Contraseña *</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...commonInputProps}
                  />
                </FormControl>
              </Grid>

              {/* Fila 5 - Tipo de Usuario */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  width: '100%',
                  maxWidth: '600px'
                }}>
                  <FormControl component="fieldset" fullWidth required>
                    <FormLabel component="legend" sx={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: 'text.primary',
                      mb: 1
                    }}>
                      <SchoolIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Tipo de Usuario *
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="tipo-usuario"
                      name="tipoUsuario"
                      value={formData.tipoUsuario}
                      onChange={handleTipoUsuarioChange}
                      sx={{ justifyContent: 'space-around', mt: 1 }}
                    >
                      <FormControlLabel
                        value="administrador"
                        control={<Radio color="primary" />}
                        label="Administrador"
                      />
                      <FormControlLabel
                        value="profesor"
                        control={<Radio color="primary" />}
                        label="Profesor"
                      />
                      <FormControlLabel
                        value="estudiante"
                        control={<Radio color="primary" />}
                        label="Estudiante"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            {/* Botón */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
              mb: 2
            }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)'
                  }
                }}
                startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <PersonAddIcon />}
              >
                {loading ? "Registrando..." : "Registrar Usuario"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default RegistrarUsuario;