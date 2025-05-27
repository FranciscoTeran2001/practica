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
  useMediaQuery
} from "@mui/material";
import { Navbar2 } from "../components/navbar2";
import React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';

const AgregarActividad = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [actividad, setActividad] = React.useState({
    titulo: "",
    descripcion: "",
    tipo: "taller", // valor por defecto
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActividad((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActividad((prev) => ({
      ...prev,
      tipo: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Actividad guardada:", actividad);
  };

  return (
    <>
      <Navbar2 />
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: { xs: '100px', md: '150px' }, // Responsive para el margin-top
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
            p: { xs: 3, md: 6 }, // Padding responsive
            borderRadius: 3,
            background: 'linear-gradient(to bottom right, #f5f5f5, #ffffff)',
            overflow: 'hidden' // Previene desbordamientos
          }}
        >
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={3} 
            sx={{ 
              mb: 4,
              flexDirection: { xs: 'column', sm: 'row' }, // Columna en móviles
              textAlign: { xs: 'center', sm: 'left' } // Centrado en móviles
            }}
          >
            <AddCircleIcon color="primary" sx={{ 
              fontSize: { xs: 40, md: 50 } // Tamaño responsive del icono
            }} />
            <Typography 
              variant={isMobile ? "h4" : "h3"} // Tamaño responsive del título
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                mt: { xs: 1, sm: 0 } // Margen solo en móviles
              }}
            >
              Nueva Actividad Académica
            </Typography>
          </Stack>

          <Divider sx={{ 
            mb: { xs: 3, md: 5 }, // Margen bottom responsive
            borderWidth: 1 
          }} />

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { 
                mb: { xs: 3, md: 4 } // Margen entre campos responsive
              },
            }}
          >
            <Box sx={{
              display: 'flex',
              gap: { xs: 3, md: 6 }, // Espacio entre columnas responsive
              flexDirection: { xs: 'column', md: 'row' }
            }}>
              {/* Columna izquierda - Campos de texto */}
              <Box sx={{ 
                flex: 1, 
                minWidth: 0 // Permite que se ajuste correctamente
              }}>
                <TextField
                  label="Título de la actividad"
                  fullWidth
                  variant="outlined"
                  name="titulo"
                  value={actividad.titulo}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    style: { 
                      fontSize: isMobile ? '1rem' : '1.1rem' // Tamaño de fuente responsive
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      height: isMobile ? '48px' : '56px' // Altura responsive
                    }
                  }}
                />
                <TextField
                  label="Descripción detallada"
                  fullWidth
                  multiline
                  rows={isMobile ? 5 : 8} // Filas responsive
                  variant="outlined"
                  name="descripcion"
                  value={actividad.descripcion}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    style: { 
                      fontSize: isMobile ? '1rem' : '1.1rem' // Tamaño de fuente responsive
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>

              {/* Columna derecha - Tipo de actividad */}
              <Box sx={{ 
                flex: 1, 
                minWidth: 0 // Permite que se ajuste correctamente
              }}>
                <Paper 
                  elevation={isMobile ? 1 : 3} // Elevación responsive
                  sx={{ 
                    p: { xs: 2, md: 4 }, // Padding responsive
                    borderRadius: 3,
                    height: '100%',
                    backgroundColor: 'background.paper'
                  }}
                >
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel 
                      component="legend" 
                      sx={{ 
                        mb: { xs: 2, md: 3 }, // Margen responsive
                        fontSize: isMobile ? '1.1rem' : '1.3rem', // Tamaño responsive
                        fontWeight: 'bold',
                        color: 'text.primary'
                      }}
                    >
                      Tipo de Actividad
                    </FormLabel>
                    <RadioGroup
                      name="tipo"
                      value={actividad.tipo}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel 
                        value="tarea" 
                        control={<Radio color="primary" size={isMobile ? "small" : "medium"} />} 
                        label={
                          <Typography sx={{ 
                            fontSize: isMobile ? '0.95rem' : '1.1rem' // Tamaño responsive
                          }}>
                            Tarea en casa
                          </Typography>
                        } 
                        sx={{ mb: { xs: 1, md: 2 } }} // Margen responsive
                      />
                      <FormControlLabel 
                        value="taller" 
                        control={<Radio color="primary" size={isMobile ? "small" : "medium"} />} 
                        label={
                          <Typography sx={{ 
                            fontSize: isMobile ? '0.95rem' : '1.1rem' // Tamaño responsive
                          }}>
                            Taller práctico
                          </Typography>
                        } 
                        sx={{ mb: { xs: 1, md: 2 } }} // Margen responsive
                      />
                      <FormControlLabel 
                        value="prueba" 
                        control={<Radio color="primary" size={isMobile ? "small" : "medium"} />} 
                        label={
                          <Typography sx={{ 
                            fontSize: isMobile ? '0.95rem' : '1.1rem' // Tamaño responsive
                          }}>
                            Prueba corta
                          </Typography>
                        } 
                        sx={{ mb: { xs: 1, md: 2 } }} // Margen responsive
                      />
                      <FormControlLabel 
                        value="examen" 
                        control={<Radio color="primary" size={isMobile ? "small" : "medium"} />} 
                        label={
                          <Typography sx={{ 
                            fontSize: isMobile ? '0.95rem' : '1.1rem' // Tamaño responsive
                          }}>
                            Examen final
                          </Typography>
                        } 
                      />
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mt: { xs: 4, md: 6 } // Margen top responsive
            }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                size="large"
                endIcon={<SendIcon sx={{ 
                  fontSize: isMobile ? '1.2rem' : '1.5rem' // Tamaño responsive
                }} />}
                sx={{
                  px: { xs: 4, md: 6 }, // Padding horizontal responsive
                  py: { xs: 1.5, md: 2 }, // Padding vertical responsive
                  fontSize: isMobile ? '1rem' : '1.1rem', // Tamaño responsive
                  borderRadius: 3,
                  fontWeight: 'bold',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease',
                  minWidth: { xs: '200px', md: '250px' } // Ancho responsive
                }}
              >
                Guardar Actividad
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AgregarActividad;