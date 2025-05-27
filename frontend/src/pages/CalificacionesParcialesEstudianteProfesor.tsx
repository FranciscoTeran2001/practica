import { 
  Container,
  Paper,
  Grid,
  Typography,
  Avatar,
  Divider,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { ArrowBack, PictureAsPdf, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import estudianteFoto from '../assets/usuario.png';
import { Navbar2 } from '../components';

const CalificacionesParcialesEstudianteProfesor = () => {
  const navigate = useNavigate();
  
  // Datos de ejemplo del estudiante y calificaciones
  const estudiante = {
    cedula: '1751486950',
    nombres: 'Luis Fernando',
    apellidos: 'Cueva Flores',
    periodo: '2023-2024',
    curso: '3ro A',
    profesor: 'Ing. Carlos Cerón',
    foto: estudianteFoto,
    calificaciones: [
      { 
        materia: 'Matemáticas',
        primerParcial: 8.5,
        segundoParcial: 7.8,
        tercerParcial: 9.2,
        comportamiento: 'A',
        notaFinal: 8.5
      },
      { 
        materia: 'Lenguaje',
        primerParcial: 7.0,
        segundoParcial: 8.3,
        tercerParcial: 8.7,
        comportamiento: 'B',
        notaFinal: 8.0
      },
      { 
        materia: 'Ciencias',
        primerParcial: 9.1,
        segundoParcial: 8.9,
        tercerParcial: 9.5,
        comportamiento: 'A',
        notaFinal: 9.2
      }
    ]
  };

  const handleGenerarPDF = () => {
    console.log("Generando PDF de calificaciones...");
    // Lógica para generar PDF
  };

  const handleEditarNotas = () => {
    // Navegar a la página de edición de notas
    navigate(`/editar-notas/${estudiante.cedula}`);
  };

  const getComportamientoColor = (comportamiento) => {
    switch(comportamiento) {
      case 'A': return 'success';
      case 'B': return 'warning';
      case 'C': return 'error';
      default: return 'default';
    }
  };

  return (
    <>
      <Navbar2/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
          onClick={() => navigate(-1)}
        >
          Regresar
        </Button>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={4}>
            {/* Columna de la foto */}
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <Avatar
                  src={estudiante.foto}
                  alt={`${estudiante.nombres} ${estudiante.apellidos}`}
                  sx={{ 
                    width: 200, 
                    height: 200,
                    border: '3px solid',
                    borderColor: 'primary.main'
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {estudiante.nombres} {estudiante.apellidos}
                </Typography>
                <Typography variant="body2">
                  Cédula: {estudiante.cedula}
                </Typography>
              </Box>
            </Grid>

            {/* Columna de los datos */}
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Calificaciones Parciales
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Período:
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {estudiante.periodo}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Curso:
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {estudiante.curso}
                  </Typography>
                </Grid>
              </Grid>

              {/* Tabla de calificaciones */}
              <TableContainer component={Paper} elevation={2} sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Materia</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Primer Parcial</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Segundo Parcial</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tercer Parcial</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Comportamiento</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nota Final</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {estudiante.calificaciones.map((calif, index) => (
                      <TableRow key={index}>
                        <TableCell>{calif.materia}</TableCell>
                        <TableCell align="center" sx={{ 
                          color: calif.primerParcial >= 7 ? 'success.main' : 'error.main',
                          fontWeight: 'bold'
                        }}>
                          {calif.primerParcial}
                        </TableCell>
                        <TableCell align="center" sx={{ 
                          color: calif.segundoParcial >= 7 ? 'success.main' : 'error.main',
                          fontWeight: 'bold'
                        }}>
                          {calif.segundoParcial}
                        </TableCell>
                        <TableCell align="center" sx={{ 
                          color: calif.tercerParcial >= 7 ? 'success.main' : 'error.main',
                          fontWeight: 'bold'
                        }}>
                          {calif.tercerParcial}
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={calif.comportamiento}
                            color={getComportamientoColor(calif.comportamiento)}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ 
                          backgroundColor: calif.notaFinal >= 7 ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                          color: calif.notaFinal >= 7 ? 'success.main' : 'error.main',
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          {calif.notaFinal}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Botones de acción */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                gap: 2
              }}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleEditarNotas}
                  sx={{
                    backgroundColor: '#ff9800',
                    '&:hover': {
                      backgroundColor: '#f57c00',
                    }
                  }}
                >
                  Editar Notas
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<PictureAsPdf />}
                  onClick={handleGenerarPDF}
                  sx={{
                    backgroundColor: '#e53935',
                    '&:hover': {
                      backgroundColor: '#c62828',
                    }
                  }}
                >
                  Generar PDF
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default CalificacionesParcialesEstudianteProfesor;