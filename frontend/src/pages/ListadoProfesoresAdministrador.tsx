import { 
  Container, 
  Typography, 
  Paper, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Box,
  useTheme
} from "@mui/material";
import { Navbar1 } from "../components/navbar1";
import { 
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Función para crear datos de profesores
function crearProfesor(
  id: number,
  cedula: string,
  nombres: string,
  apellidos: string,
  cursoAsignado: string,
  estado: 'activo' | 'licencia' | 'jubilado'
) {
  return { id, cedula, nombres, apellidos, cursoAsignado, estado };
}

// Datos de ejemplo de profesores
const profesores = [
  crearProfesor(1, '0951234567', 'Juan Carlos', 'Pérez González', '2do A', 'activo'),
  crearProfesor(2, '0957654321', 'María José', 'Gómez Rodríguez', '3ro B', 'activo'),
  crearProfesor(3, '0959876543', 'Pedro Antonio', 'Martínez López', '4to A', 'licencia'),
  crearProfesor(4, '0954567890', 'Ana Lucía', 'Fernández Castro', '2do A', 'activo'),
  crearProfesor(5, '0956789012', 'Luis Miguel', 'Díaz Mendoza', '3ro B', 'activo'),
  crearProfesor(6, '0952345678', 'Sofía Alejandra', 'Hernández Vega', '4to B', 'jubilado'),
  crearProfesor(7, '0953456789', 'Carlos Andrés', 'Ramírez Torres', '5to A', 'activo'),
];

export const ListadoProfesoresAdministrador = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'activo': return 'success';
      case 'licencia': return 'warning';
      case 'jubilado': return 'info';
      default: return 'default';
    }
  };

  return (
    <>
      <Navbar1 />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Encabezado */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
          }}>
            Listado de Profesores
          </Typography>
        </Box>
        
        {/* Tabla de profesores */}
        <TableContainer 
          component={Paper} 
          sx={{ 
            mb: 3, 
            boxShadow: 3,
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="lista de profesores">
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: theme.palette.primary.main,
                '& th': { 
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }
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
              {profesores.map((profesor) => (
                <TableRow
                  key={profesor.id}
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <TableCell>{profesor.id}</TableCell>
                  <TableCell>{profesor.cedula}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: theme.palette.secondary.main
                      }}>
                        <PersonIcon fontSize="small" />
                      </Avatar>
                      {profesor.nombres}
                    </Box>
                  </TableCell>
                  <TableCell>{profesor.apellidos}</TableCell>
                  <TableCell>
                    <Chip 
                      label="Profesor" 
                      size="small" 
                      color="primary"
                      icon={<SchoolIcon fontSize="small" />}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={profesor.cursoAsignado} 
                      color="secondary" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={profesor.estado.toUpperCase()} 
                      color={getEstadoColor(profesor.estado)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pie de página */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mt: 3
        }}>
          <Button 
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ 
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px'
              }
            }}
          >
            Regresar
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ListadoProfesoresAdministrador;