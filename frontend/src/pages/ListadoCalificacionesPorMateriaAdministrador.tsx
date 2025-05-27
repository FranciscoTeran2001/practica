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
  Link
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { Navbar3 } from "../components";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

// Sample student data with icon-based avatars
const initialStudents = [
  { 
    id: 1,
    cedula: '001-0102030', 
    nombres: 'Ana María', 
    apellidos: 'García López', 
    tipo: 'Estudiante',
    curso: '2DO A',
    periodo: '2024 Diciembre-2025 Febrero'
  },
  { 
    id: 2,
    cedula: '001-0405060', 
    nombres: 'Luis Carlos', 
    apellidos: 'Martínez Fernández', 
    tipo: 'Estudiante',
    curso: '3ERO B',
    periodo: '2024 Diciembre-2025 Febrero'
  },
  { 
    id: 3,
    cedula: '001-0708090', 
    nombres: 'Marta Elena', 
    apellidos: 'Sánchez Ruiz', 
    tipo: 'Estudiante',
    curso: '4TO A',
    periodo: '2024 Diciembre-2025 Febrero'
  },
  { 
    id: 4,
    cedula: '001-1234567', 
    nombres: 'Carlos Andrés', 
    apellidos: 'Rodríguez Pérez', 
    tipo: 'Estudiante',
    curso: '5TO B',
    periodo: '2024 Diciembre-2025 Febrero'
  },
  { 
    id: 5,
    cedula: '001-7654321', 
    nombres: 'Sofía Alejandra', 
    apellidos: 'Fernández González', 
    tipo: 'Estudiante',
    curso: '6TO A',
    periodo: '2024 Diciembre-2025 Febrero'
  },
];

// Custom theme
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

const ListadoCalificacionesPorMateriaAdministrador = () => {
  const navigate = useNavigate();
  const [students] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Todos');
  const [selectedPeriod, setSelectedPeriod] = useState('Todos');

  // Get unique courses and periods for filters
  const courses = [...new Set(students.map(student => student.curso))];
  const periods = [...new Set(students.map(student => student.periodo))];

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.cedula.includes(searchTerm);
    
    const matchesCourse = selectedCourse === 'Todos' || student.curso === selectedCourse;
    const matchesPeriod = selectedPeriod === 'Todos' || student.periodo === selectedPeriod;
    
    return matchesSearch && matchesCourse && matchesPeriod;
  });

  // Handle click on student name
  const handleStudentClick = (studentId) => {
    navigate(`/estudiante/${studentId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar3 />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 3
        }}>
          Listado de Calificaciones
        </Typography>

        {/* Filters Section */}
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
                <TableCell>NOMBRES Y APELLIDOS</TableCell>
                <TableCell>TIPO</TableCell>
                <TableCell>CURSO</TableCell>
                <TableCell>PERIODO</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <TableRow 
                    key={student.id}
                    hover
                    sx={{
                      '&:nth-of-type(even)': {
                        backgroundColor: 'action.hover',
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
                        <Link
                          component="button"
                          variant="body1"
                          onClick={() => handleStudentClick(student.id)}
                          sx={{
                            fontWeight: 'medium',
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                              color: 'primary.dark'
                            }
                          }}
                        >
                          {student.nombres} {student.apellidos}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.tipo}
                        color="primary"
                        size="small"
                        sx={{
                          borderRadius: 1,
                          fontWeight: 'medium'
                        }}
                      />
                    </TableCell>
                    <TableCell>{student.curso}</TableCell>
                    <TableCell>{student.periodo}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron estudiantes
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

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

export default ListadoCalificacionesPorMateriaAdministrador;