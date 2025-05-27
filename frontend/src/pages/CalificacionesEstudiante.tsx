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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '1.2rem', // Aumentado
    padding: '16px 24px', // Aumentado
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem', // Aumentado
      padding: '12px 16px' // Aumentado
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1.1rem', // Aumentado
    padding: '16px 24px', // Aumentado
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem', // Aumentado
      padding: '12px 16px' // Aumentado
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
  height: '60px' // Aumentado
}));

const HighlightedTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.success.light + '40',
  '& td': {
    fontWeight: 'bold',
  },
  '&:hover': {
    backgroundColor: theme.palette.success.light + '60',
  },
  height: '65px' // Aumentado
}));

function createData(
  periodo: string,
  matematicas: number | string,
  historia: number | string,
  ciencias: number | string,
  educacionFisica: number | string,
) {
  return { periodo, matematicas, historia, ciencias, educacionFisica };
}

const rows = [
  createData('Parcial 1', 9.5, 8.7, 9.2, 10),
  createData('Parcial 2', 8.9, 9.3, 9.8, 9.5),
  createData('Parcial 3', 9.7, 9.1, 9.5, 10),
  createData('Promedio', 9.4, 9.0, 9.5, 9.8),
  createData('Comportamiento', 'A', '', '', ''),
  createData('Promedio General', 9.4, '', '', ''),
];

const handleGeneratePDF = () => {
  console.log('Generando PDF de notas...');
};

const CalificacionesEstudiante = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          
          <Box sx={{ 
            width: '100%',
            overflowX: 'auto',
            '-webkit-overflow-scrolling': 'touch',
            mb: 3
          }}>
            <TableContainer 
              component={Paper}
              sx={{
                border: '1px solid',
                borderColor: 'success.light',
                borderRadius: 2,
                minWidth: '800px' // Aumentado considerablemente
              }}
            >
              <Table aria-label="customized table" sx={{ minWidth: isMobile ? '800px' : '100%' }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ width: '25%' }}>Periodo</StyledTableCell>
                    <StyledTableCell align="right" sx={{ width: '18%' }}>Matemáticas</StyledTableCell>
                    <StyledTableCell align="right" sx={{ width: '18%' }}>Historia</StyledTableCell>
                    <StyledTableCell align="right" sx={{ width: '18%' }}>Ciencias</StyledTableCell>
                    <StyledTableCell align="right" sx={{ width: '18%' }}>Educ. Física</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => {
                    const isHighlighted = ['Promedio', 'Comportamiento', 'Promedio General'].includes(row.periodo);
                    const TableRowComponent = isHighlighted ? HighlightedTableRow : StyledTableRow;
                    
                    return (
                      <TableRowComponent key={row.periodo}>
                        <StyledTableCell component="th" scope="row">
                          {row.periodo}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.matematicas}</StyledTableCell>
                        <StyledTableCell align="right">{row.historia}</StyledTableCell>
                        <StyledTableCell align="right">{row.ciencias}</StyledTableCell>
                        <StyledTableCell align="right">{row.educacionFisica}</StyledTableCell>
                      </TableRowComponent>
                    );
                  })}
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