import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Navbar3 } from '../components';
import DownloadIcon from '@mui/icons-material/Download';
import GradingIcon from '@mui/icons-material/Grading';
import { useTheme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

// Definición de tipos
type Materia = {
  id: number;
  nombreMateria: string;
};

type Nota = {
  periodo: string;
  [key: string]: number | string; // Permite dinámicamente cualquier materia como clave
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '1.2rem',
    padding: '16px 24px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      padding: '12px 16px'
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1.1rem',
    padding: '16px 24px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      padding: '12px 16px'
    }
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.success.light + '20',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  height: '60px'
}));

const HighlightedTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.success.light + '40',
  '& td': {
    fontWeight: 'bold',
  },
  '&:hover': {
    backgroundColor: theme.palette.success.light + '60',
  },
  height: '65px'
}));

const SummaryTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 'bold',
  padding: '16px 24px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    padding: '12px 16px'
  },
  backgroundColor: theme.palette.success.light + '20',
  borderBottom: 'none'
}));

const CalificacionesEstudiante = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [comportamiento, setComportamiento] = useState<string>('');
  const [promedioGeneral, setPromedioGeneral] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener materias desde tu backend Spring Boot
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/materias`, {
          credentials: 'include' // Importante para las cookies con CORS
        });
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const materiasData = await response.json();
        setMaterias(materiasData);
        
        // Simular datos de notas (deberías reemplazar esto con tu API real)
        const { notasSimuladas, comportamiento, promedioGeneral } = generarNotasSimuladas(materiasData);
        setNotas(notasSimuladas);
        setComportamiento(comportamiento);
        setPromedioGeneral(promedioGeneral);
        
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener datos:', err);
        setError('Error al cargar los datos. Por favor intenta nuevamente.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para generar datos simulados (reemplazar con tu API real)
  const generarNotasSimuladas = (materias: Materia[]): {
    notasSimuladas: Nota[];
    comportamiento: string;
    promedioGeneral: string;
  } => {
    const periodos = ['Parcial 1', 'Parcial 2', 'Parcial 3'];
    
    // Crear notas para cada parcial
    const notasParciales = periodos.map(periodo => {
      const nota: Nota = { periodo };
      materias.forEach(materia => {
        // Generar una nota aleatoria entre 7 y 10 para cada materia
        nota[materia.nombreMateria] = (Math.random() * 3 + 7).toFixed(1);
      });
      return nota;
    });
    
    // Calcular promedios por materia
    const promedio: Nota = { periodo: 'Promedio' };
    materias.forEach(materia => {
      const suma = notasParciales.reduce((acc, curr) => 
        acc + parseFloat(curr[materia.nombreMateria] as string), 0);
      promedio[materia.nombreMateria] = (suma / notasParciales.length).toFixed(1);
    });
    
    // Comportamiento (solo una nota independiente)
    const comportamiento = 'A'; // Puedes cambiarlo por el valor real o aleatorio
    
    // Promedio general (solo una nota)
    const sumaPromedios = materias.reduce((acc, materia) => 
      acc + parseFloat(promedio[materia.nombreMateria] as string), 0);
    const promedioGeneral = (sumaPromedios / materias.length).toFixed(1);
    
    return {
      notasSimuladas: [...notasParciales, promedio],
      comportamiento,
      promedioGeneral
    };
  };

  const handleGeneratePDF = () => {
    console.log('Generando PDF de notas...');
  };

  if (loading) {
    return (
      <>
        <Navbar3 />
        <Box sx={{ p: 4, textAlign: 'center', mt: 10 }}>
          <Typography variant="h6">Cargando calificaciones...</Typography>
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar3 />
        <Box sx={{ p: 4, textAlign: 'center', mt: 10 }}>
          <Typography variant="h6" color="error">{error}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Reintentar
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar3 /> 
      <Box sx={{ 
        p: { xs: 2, sm: 4 },
        background: 'linear-gradient(to bottom, #f5f5f5, #e8f5e9)',
        minHeight: 'calc(100vh - 150px)',
        marginTop: '150px' 
      }}>
        <Box sx={{ 
          maxWidth: '1400px', 
          mx: 'auto',
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            borderBottom: '2px solid',
            borderColor: 'success.main',
            pb: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <GradingIcon color="success" sx={{ 
              fontSize: { xs: 30, sm: 40 }, 
              mr: { xs: 0, sm: 2 },
              mb: { xs: 1, sm: 0 }
            }} />
            <Typography 
              variant={isMobile ? "h5" : "h4"}
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              Calificaciones Académicas
            </Typography>
          </Box>
          
          {/* Tabla principal de calificaciones */}
          <Box sx={{ 
            width: '100%',
            overflowX: 'auto',
            '-webkit-overflow-scrolling': 'touch',
            mb: 4
          }}>
            <TableContainer 
              component={Paper}
              sx={{
                border: '1px solid',
                borderColor: 'success.light',
                borderRadius: 2,
                minWidth: '800px'
              }}
            >
              <Table aria-label="customized table" sx={{ minWidth: isMobile ? '800px' : '100%' }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ width: '25%' }}>Periodo</StyledTableCell>
                    {materias.map(materia => (
                      <StyledTableCell 
                        key={materia.id} 
                        align="right" 
                        sx={{ width: `${75 / materias.length}%` }}
                      >
                        {materia.nombreMateria}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notas.map((row, index) => {
                    const isHighlighted = row.periodo === 'Promedio';
                    const TableRowComponent = isHighlighted ? HighlightedTableRow : StyledTableRow;
                    
                    return (
                      <TableRowComponent key={`${row.periodo}-${index}`}>
                        <StyledTableCell component="th" scope="row">
                          {row.periodo}
                        </StyledTableCell>
                        {materias.map(materia => (
                          <StyledTableCell key={`${materia.id}-${row.periodo}`} align="right">
                            {row[materia.nombreMateria] || ''}
                          </StyledTableCell>
                        ))}
                      </TableRowComponent>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Tabla de resumen (Comportamiento y Promedio General) */}
          <Box sx={{ 
            mb: 4,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <TableContainer 
              component={Paper}
              sx={{
                border: '1px solid',
                borderColor: 'success.light',
                borderRadius: 2,
                maxWidth: '500px',
                width: '100%'
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <SummaryTableCell component="th" scope="row" sx={{ width: '60%' }}>
                      Comportamiento:
                    </SummaryTableCell>
                    <SummaryTableCell align="right" sx={{ width: '40%' }}>
                      {comportamiento}
                    </SummaryTableCell>
                  </TableRow>
                  <TableRow>
                    <SummaryTableCell component="th" scope="row">
                      Promedio General:
                    </SummaryTableCell>
                    <SummaryTableCell align="right">
                      {promedioGeneral}
                    </SummaryTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 4
          }}>
            <Button 
              variant="contained" 
              color="success"
              onClick={handleGeneratePDF}
              startIcon={<DownloadIcon />}
              sx={{
                px: { xs: 3, sm: 4 },
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
            >
              Descargar Reporte
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CalificacionesEstudiante;