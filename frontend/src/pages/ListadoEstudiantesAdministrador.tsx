import { Container, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, Box, useTheme, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Navbar1 } from "../components/navbar1";
import { 
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Estudiante {
  id: number;
  idUsuario: string;
  nombres: string;
  apellidos: string;
  cursoAsignado: string;
  estado: 'activo' | 'inactivo' | 'graduado';
  email?: string;
}

export const ListadoEstudiantesAdministrador = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cursos, setCursos] = useState<string[]>([]);
  const [filtroCurso, setFiltroCurso] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  // Obtener estudiantes del backend
  const fetchEstudiantes = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/usuarios/estudiantes`);
      if (!response.ok) throw new Error('Error al obtener estudiantes');
      
      const data = await response.json();
      setEstudiantes(data);
      
      // Obtener cursos únicos para filtrado
      const cursosUnicos = [...new Set(data.map((e: Estudiante) => e.cursoAsignado))];
      setCursos(cursosUnicos as string[]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Obtener datos al cargar el componente
  useEffect(() => {
    fetchEstudiantes();
  }, []);

  // Filtrar estudiantes
  const estudiantesFiltrados = estudiantes.filter(estudiante => {
    const cumpleCurso = filtroCurso === 'Todos' || estudiante.cursoAsignado === filtroCurso;
    const cumpleEstado = filtroEstado === 'Todos' || estudiante.estado === filtroEstado;
    return cumpleCurso && cumpleEstado;
  });

  const getEstadoColor = (estado: string) => {
    switch(estado) {
      case 'activo': return 'success';
      case 'inactivo': return 'warning';
      case 'graduado': return 'info';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button 
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Regresar
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Navbar1 />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Encabezado con filtros */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Listado de Estudiantes
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Curso</InputLabel>
              <Select
                value={filtroCurso}
                onChange={(e) => setFiltroCurso(e.target.value)}
                label="Curso"
              >
                <MenuItem value="Todos">Todos los cursos</MenuItem>
                {cursos.map(curso => (
                  <MenuItem key={curso} value={curso}>{curso}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Estado</InputLabel>
              <Select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                label="Estado"
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="inactivo">Inactivo</MenuItem>
                <MenuItem value="graduado">Graduado</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchEstudiantes}
              sx={{ height: 40 }}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
        
        {/* Tabla de estudiantes */}
        <TableContainer component={Paper} sx={{ mb: 3, borderRadius: '12px' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: theme.palette.primary.main,
                '& th': { color: 'white', fontWeight: 'bold' }
              }}>
                <TableCell>#</TableCell>
                <TableCell>CÉDULA</TableCell>
                <TableCell>NOMBRES</TableCell>
                <TableCell>APELLIDOS</TableCell>
                <TableCell>TIPO</TableCell>
                <TableCell>CURSO</TableCell>
                <TableCell>ESTADO</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {estudiantesFiltrados.map((estudiante) => (
                <TableRow key={estudiante.id} hover>
                  <TableCell>{estudiante.id}</TableCell>
                  <TableCell>{estudiante.idUsuario}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: theme.palette.secondary.main
                      }}>
                        <PersonIcon fontSize="small" />
                      </Avatar>
                      {estudiante.nombres}
                    </Box>
                  </TableCell>
                  <TableCell>{estudiante.apellidos}</TableCell>
                  <TableCell>
                    <Chip 
                      label="Estudiante" 
                      size="small" 
                      color="primary"
                      icon={<SchoolIcon fontSize="small" />}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={estudiante.cursoAsignado} 
                      color="secondary" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={estudiante.estado.toUpperCase()} 
                      color={getEstadoColor(estudiante.estado)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pie de página */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ 
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              borderWidth: '2px'
            }}
          >
            Regresar
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ListadoEstudiantesAdministrador;