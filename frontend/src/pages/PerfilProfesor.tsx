import { 
  Container, Paper, Typography, Avatar, Divider, Box, Button, Chip, useTheme,
  CircularProgress, Alert
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import profesorFoto from '../assets/usuario.png';
import { Navbar2 } from '../components';

interface Curso {
  id: number;
  nombreCurso: string;
}

interface ProfesorData {
  cedula: string;
  nombres: string;
  apellidos: string;
  periodo: string;
  cursos: Curso[];
  foto: string;
}

const PerfilProfesor = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Datos del profesor
  const profesor = {
    cedula: '001-7654321',
    nombres: 'Carlos Fernando',
    apellidos: 'Cerón Flores',
    periodo: '2023-2024',
    cursos: ['3ro A', '4to B', '5to C'],
    foto: profesorFoto
  };

  return (
    <>
      <Navbar2/>
      <Container maxWidth="sm" sx={{ 
        mt: 4, 
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Paper elevation={4} sx={{ 
          p: 4, 
          width: '100%',
          borderRadius: '16px',
          background: 'linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #3f51b5, #2196f3)'
          }
        }}>
          {/* Foto con efecto circular */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 3,
            position: 'relative'
          }}>
            <Avatar
              src={profesor.foto}
              alt={`${profesor.nombres} ${profesor.apellidos}`}
              sx={{ 
                width: 180, 
                height: 180,
                border: '4px solid',
                borderColor: theme.palette.primary.main,
                boxShadow: theme.shadows[4],
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease'
                }
              }}
            />
          </Box>

          {/* Nombre con gradiente de texto */}
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            {profesor.nombres} {profesor.apellidos}
          </Typography>

          <Divider sx={{ 
            my: 3, 
            borderWidth: '1px',
            borderColor: 'rgba(0, 0, 0, 0.12)',
            background: 'linear-gradient(to right, transparent, #2196f3, transparent)'
          }} />

          {/* Datos en columna vertical - Cédula y Período uno debajo del otro */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            px: 2,
            mb: 3
          }}>
            {/* Cédula */}
            <Paper elevation={2} sx={{ 
              p: 2, 
              borderRadius: '12px',
              background: 'rgba(63, 81, 181, 0.05)'
            }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                CÉDULA
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: '1.1rem',
                fontWeight: 'medium',
                color: theme.palette.primary.dark
              }}>
                {profesor.cedula}
              </Typography>
            </Paper>

            {/* Período */}
            <Paper elevation={2} sx={{ 
              p: 2, 
              borderRadius: '12px',
              background: 'rgba(33, 150, 243, 0.05)'
            }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                PERÍODO
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: '1.1rem',
                fontWeight: 'medium',
                color: theme.palette.primary.dark
              }}>
                {profesor.periodo}
              </Typography>
            </Paper>
          </Box>

          {/* Cursos (ocupa todo el ancho) */}
          <Paper elevation={2} sx={{ 
            p: 2, 
            borderRadius: '12px',
            background: 'rgba(233, 30, 99, 0.05)',
            mb: 3
          }}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
              CURSOS ASIGNADOS
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: 1.5,
              mt: 2
            }}>
              {profesor.cursos.map((curso, index) => (
                <Chip 
                  key={index}
                  label={curso}
                  color="primary"
                  variant="filled"
                  sx={{
                    fontWeight: 'bold',
                    px: 1.5,
                    py: 1,
                    backgroundColor: index % 2 === 0 ? '#3f51b5' : '#2196f3',
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[2]
                    }
                  }}
                />
              ))}
            </Box>
          </Paper>

          {/* Botón de regresar centrado al final */}
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(0, 0, 0, 0.08)'
          }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: '50px',
                borderWidth: '2px',
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderWidth: '2px',
                  backgroundColor: 'rgba(33, 150, 243, 0.08)'
                }
              }}
            >
              Regresar
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PerfilProfesor;