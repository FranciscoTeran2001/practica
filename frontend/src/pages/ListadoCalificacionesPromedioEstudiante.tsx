import { 
  Container, 
  Paper, 
  Typography, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableContainer,
  Button,
  Avatar,
  Box,
  Chip,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { Navbar1 } from "../components/navbar1";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

// Datos de ejemplo de estudiantes
const initialStudents = [
  { 
    id: 1,
    cedula: '001-0102030', 
    nombres: 'Ana María', 
    apellidos: 'García López', 
    curso: '2DO A',
    periodo: '2024 Diciembre-2025 Febrero',
    promedio: 8.7,
    materias: [
      { nombre: 'Matemáticas', calificacion: 9.2 },
      { nombre: 'Lengua', calificacion: 8.5 },
      { nombre: 'Ciencias', calificacion: 8.4 }
    ]
  },
  { 
    id: 2,
    cedula: '001-0405060', 
    nombres: 'Luis Carlos', 
    apellidos: 'Martínez Fernández', 
    curso: '3ERO B',
    periodo: '2024 Diciembre-2025 Febrero',
    promedio: 7.9,
    materias: [
      { nombre: 'Matemáticas', calificacion: 8.1 },
      { nombre: 'Lengua', calificacion: 7.5 },
      { nombre: 'Ciencias', calificacion: 8.1 }
    ]
  },
  { 
    id: 3,
    cedula: '001-0708090', 
    nombres: 'Marta Elena', 
    apellidos: 'Sánchez Ruiz', 
    curso: '4TO A',
    periodo: '2024 Diciembre-2025 Febrero',
    promedio: 9.1,
    materias: [
      { nombre: 'Matemáticas', calificacion: 9.5 },
      { nombre: 'Lengua', calificacion: 8.8 },
      { nombre: 'Ciencias', calificacion: 9.0 }
    ]
  },
  { 
    id: 4,
    cedula: '001-1234567', 
    nombres: 'Carlos Andrés', 
    apellidos: 'Rodríguez Pérez', 
    curso: '5TO B',
    periodo: '2024 Diciembre-2025 Febrero',
    promedio: 8.2,
    materias: [
      { nombre: 'Matemáticas', calificacion: 8.5 },
      { nombre: 'Lengua', calificacion: 8.0 },
      { nombre: 'Ciencias', calificacion: 8.1 }
    ]
  },
  { 
    id: 5,
    cedula: '001-7654321', 
    nombres: 'Sofía Alejandra', 
    apellidos: 'Fernández González', 
    curso: '6TO A',
    periodo: '2024 Diciembre-2025 Febrero',
    promedio: 8.9,
    materias: [
      { nombre: 'Matemáticas', calificacion: 9.0 },
      { nombre: 'Lengua', calificacion: 8.8 },
      { nombre: 'Ciencias', calificacion: 8.9 }
    ]
  },
];

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c387e',
      light: '#6573c3',
      dark: '#001c4b',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

const ListadoCalificacionesPromedioEstudiante = () => {
  const navigate = useNavigate();
  const [students] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Todos');
  const [selectedPeriod, setSelectedPeriod] = useState('Todos');
  const [expandedStudent, setExpandedStudent] = useState(null);

  // Filtrar estudiantes
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.cedula.includes(searchTerm);
    
    const matchesCourse = selectedCourse === 'Todos' || student.curso === selectedCourse;
    const matchesPeriod = selectedPeriod === 'Todos' || student.periodo === selectedPeriod;
    
    return matchesSearch && matchesCourse && matchesPeriod;
  });

  // Obtener cursos y períodos únicos para los filtros
  const courses = [...new Set(students.map(student => student.curso))];
  const periods = [...new Set(students.map(student => student.periodo))];

  // Alternar vista expandida
  const toggleExpandedStudent = (studentId) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  // Redirigir a página de detalles
  const handleVerDetalles = (studentId) => {
    navigate(`/detalles-calificaciones/${studentId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar1 />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 3
        }}>
          Promedios de Calificaciones por Estudiante
        </Typography>

        {/* Sección de Filtros */}
        <Paper sx={{ 
          p: 2, 
          mb: 3,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <TextField
              placeholder="Buscar estudiantes..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flex: '1 1 300px',
                minWidth: 250
              }}
            />
            
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                minWidth: 120,
                flex: '1 0 auto'
              }}
            >
              <MenuItem value="Todos">Todos los cursos</MenuItem>
              {courses.map((course, index) => (
                <MenuItem key={index} value={course}>{course}</MenuItem>
              ))}
            </Select>
            
            <Select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                minWidth: 250,
                flex: '1 0 auto'
              }}
            >
              <MenuItem value="Todos">Todos los periodos</MenuItem>
              {periods.map((period, index) => (
                <MenuItem key={index} value={period}>{period}</MenuItem>
              ))}
            </Select>
          </Box>
        </Paper>

        {/* Tabla de estudiantes */}
        <TableContainer 
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            overflow: 'hidden'
          }}
        >
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ 
                bgcolor: 'primary.main',
                '& th': {
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  py: 2
                }
              }}>
                <TableCell>#</TableCell>
                <TableCell>CÉDULA</TableCell>
                <TableCell>ESTUDIANTE</TableCell>
                <TableCell>CURSO</TableCell>
                <TableCell>PERIODO</TableCell>
                <TableCell align="right">PROMEDIO</TableCell>
                <TableCell align="center">ACCIÓN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <>
                    <TableRow 
                      key={student.id}
                      hover
                      onClick={() => toggleExpandedStudent(student.id)}
                      sx={{
                        cursor: 'pointer',
                        '&:nth-of-type(odd)': {
                          backgroundColor: expandedStudent === student.id ? 'action.selected' : 'inherit',
                        },
                        '&:nth-of-type(even)': {
                          backgroundColor: expandedStudent === student.id ? 'action.selected' : 'action.hover',
                        }
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.cedula}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 36, 
                              height: 36,
                              mr: 2,
                              bgcolor: 'primary.light'
                            }}
                          >
                            <PersonIcon />
                          </Avatar>
                          <Typography sx={{ fontWeight: 'medium' }}>
                            {student.nombres} {student.apellidos}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{student.curso}</TableCell>
                      <TableCell>{student.periodo}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={student.promedio.toFixed(1)}
                          color={
                            student.promedio >= 9 ? 'success' :
                            student.promedio >= 7 ? 'primary' : 'warning'
                          }
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '0.875rem'
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVerDetalles(student.id);
                          }}
                          sx={{
                            textTransform: 'none',
                            fontSize: '0.75rem',
                            px: 1.5,
                            py: 0.5
                          }}
                        >
                          Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedStudent === student.id && (
                      <TableRow>
                        <TableCell colSpan={7} sx={{ 
                          backgroundColor: 'background.default',
                          p: 0
                        }}>
                          <Box sx={{ p: 2 }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                              Detalle de Calificaciones
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Materia</TableCell>
                                  <TableCell align="right">Calificación</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {student.materias.map((materia, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{materia.nombre}</TableCell>
                                    <TableCell align="right">
                                      <Chip
                                        label={materia.calificacion.toFixed(1)}
                                        color={
                                          materia.calificacion >= 9 ? 'success' :
                                          materia.calificacion >= 7 ? 'primary' : 'warning'
                                        }
                                        size="small"
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron estudiantes
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Botón de regreso */}
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          sx={{ 
            mt: 3,
            borderRadius: 2,
            px: 3,
            py: 1,
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default ListadoCalificacionesPromedioEstudiante;