import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel
} from "@mui/material";
import { Navbar2 } from "../components/navbar2";
import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from "react-router-dom";

const AgregarActividad = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { idParcial } = useParams();
  
  const [actividad, setActividad] = useState({
    titulo: "",
    descripcion: "",
    tipoActividad: "TAREA",
    fecha: new Date().toISOString().split('T')[0],
    fechaLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    valorMaximo: 100,
    numeroParcial: 1
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActividad(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
  setActividad(prev => ({
    ...prev,
    tipoActividad: e.target.value.toUpperCase(), // Convertir a mayúsculas para coincidir con tu backend
  }));
};

  
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Verificación adicional antes de enviar
  if (!idParcial || isNaN(parseInt(idParcial))) {
    setSnackbar({
      open: true,
      message: "Error crítico: ID de parcial inválido",
      severity: "error"
    });
    return;
  }

  setLoading(true);
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/actividades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({
        idParcial: parseInt(idParcial),
        tipoActividad: actividad.tipoActividad,
        tituloActividad: actividad.titulo,
        fechaInicioEntrega: actividad.fecha,
        fechaFinEntrega: actividad.fechaLimite,
        descripcion: actividad.descripcion,
        valorMaximo: parseFloat(actividad.valorMaximo),
        numeroParcial: parseInt(actividad.numeroParcial)
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `Error ${response.status}: ${response.statusText}`
      );
    }

    // Resto del código para éxito...
  } catch (error) {
    console.error("Error completo:", error);
    setSnackbar({
      open: true,
      message: error.message.includes("id must not be null") 
        ? "El parcial seleccionado no existe en el sistema" 
        : error.message,
      severity: "error"
    });
  } finally {
    setLoading(false);
  }
};

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Navbar2 />
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: { xs: '100px', md: '150px' },
          mb: 6,
          minHeight: 'calc(100vh - 100px)',
          [theme.breakpoints.up('md')]: {
            minHeight: 'calc(100vh - 150px)'
          }
        }}
      >
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            background: 'linear-gradient(to bottom right, #f5f5f5, #ffffff)',
            overflow: 'hidden'
          }}
        >
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={3} 
            sx={{ 
              mb: 4,
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            <AddCircleIcon color="primary" sx={{ 
              fontSize: { xs: 40, md: 50 }
            }} />
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                mt: { xs: 1, sm: 0 }
              }}
            >
              Nueva Actividad Académica
            </Typography>
          </Stack>

          <Divider sx={{ 
            mb: { xs: 3, md: 5 },
            borderWidth: 1 
          }} />

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { 
                mb: { xs: 3, md: 4 }
              },
            }}
          >
            <Box sx={{
              display: 'flex',
              gap: { xs: 3, md: 6 },
              flexDirection: { xs: 'column', md: 'row' }
            }}>
              {/* Columna izquierda - Campos principales */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <TextField
                  label="Título de la actividad"
                  fullWidth
                  variant="outlined"
                  name="titulo"
                  value={actividad.titulo}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    style: { fontSize: isMobile ? '1rem' : '1.1rem' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      height: isMobile ? '48px' : '56px'
                    }
                  }}
                />

                <TextField
                  label="Descripción detallada"
                  fullWidth
                  multiline
                  rows={isMobile ? 5 : 8}
                  variant="outlined"
                  name="descripcion"
                  value={actividad.descripcion}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    style: { fontSize: isMobile ? '1rem' : '1.1rem' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>

              {/* Columna derecha - Configuraciones */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Paper 
                  elevation={isMobile ? 1 : 3}
                  sx={{ 
                    p: { xs: 2, md: 4 },
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                    mb: { xs: 3, md: 4 }
                  }}
                >
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel 
                      component="legend" 
                      sx={{ 
                        mb: { xs: 2, md: 3 },
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        fontWeight: 'bold',
                        color: 'text.primary'
                      }}
                    >
                      Tipo de Actividad
                    </FormLabel>
                    <RadioGroup
                      name="tipoActividad"
                      value={actividad.tipoActividad.toLowerCase()} // Valor actual en minúsculas
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel 
                        value="tarea" 
                        control={<Radio color="primary" size={isMobile ? "small" : "medium"} />} 
                        label={
                          <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1.1rem' }}>
                            Tarea en casa
                          </Typography>
                        } 
                        sx={{ mb: { xs: 1, md: 2 } }}
                      />
                      <FormControlLabel 
                        value="taller" 
                        control={<Radio color="primary" size={isMobile ? "small" : "medium"} />} 
                        label={
                          <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1.1rem' }}>
                            Taller práctico
                          </Typography>
                        } 
                        sx={{ mb: { xs: 1, md: 2 } }}
                      />
                      <FormControlLabel 
                        value="prueba" 
                        control={<Radio color="primary" size={isMobile ? "small" : "medium"} />} 
                        label={
                          <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1.1rem' }}>
                            Prueba corta
                          </Typography>
                        } 
                        sx={{ mb: { xs: 1, md: 2 } }}
                      />
                      <FormControlLabel 
                        value="examen" 
                        control={<Radio color="primary" size={isMobile ? "small" : "medium"} />} 
                        label={
                          <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1.1rem' }}>
                            Examen final
                          </Typography>
                        } 
                      />
                    </RadioGroup>
                  </FormControl>
                </Paper>

                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: { xs: 3, sm: 4 },
                  mb: { xs: 3, md: 4 }
                }}>
                  <TextField
                    label="Fecha de inicio"
                    type="date"
                    fullWidth
                    variant="outlined"
                    name="fecha"
                    value={actividad.fecha}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      style: { fontSize: isMobile ? '1rem' : '1.1rem' }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: isMobile ? '48px' : '56px'
                      }
                    }}
                  />

                  <TextField
                    label="Fecha límite de entrega"
                    type="date"
                    fullWidth
                    variant="outlined"
                    name="fechaLimite"
                    value={actividad.fechaLimite}
                    onChange={handleInputChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      style: { fontSize: isMobile ? '1rem' : '1.1rem' }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: isMobile ? '48px' : '56px'
                      }
                    }}
                  />
                </Box>

                <FormControl fullWidth sx={{ mb: { xs: 3, md: 4 } }}>
                  <InputLabel id="numero-parcial-label" shrink>
                    Número de Parcial
                  </InputLabel>
                  <Select
                    labelId="numero-parcial-label"
                    id="numero-parcial"
                    name="numeroParcial"
                    value={actividad.numeroParcial}
                    onChange={handleInputChange}
                    required
                    label="Número de Parcial"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: isMobile ? '48px' : '56px'
                      }
                    }}
                  >
                    <MenuItem value={1}>Parcial 1</MenuItem>
                    <MenuItem value={2}>Parcial 2</MenuItem>
                    <MenuItem value={3}>Parcial 3</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Valor máximo (puntos)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  name="valorMaximo"
                  value={actividad.valorMaximo}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    inputProps: { min: 1 },
                    style: { fontSize: isMobile ? '1rem' : '1.1rem' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      height: isMobile ? '48px' : '56px'
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Botón de enviar con más espacio arriba */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mt: { xs: 2, md: 4 },
              mb: 2,
              pt: 4,
              borderTop: '1px solid',
              borderColor: 'divider'
            }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large"
                disabled={loading}
                endIcon={<SendIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />}
                sx={{
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  borderRadius: 3,
                  fontWeight: 'bold',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease',
                  minWidth: { xs: '200px', md: '250px' }
                }}
              >
                {loading ? "Guardando..." : "Guardar Actividad"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AgregarActividad;