import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Paper,
  Tabs,
  Tab,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  List,
  ListItem,
  IconButton,
  ListItemText
} from "@mui/material";
import { 
  People as PeopleIcon,
  Grade as GradeIcon,
  Assignment as AssignmentIcon,
  Edit as EditIcon,
  PictureAsPdf as PdfIcon,
  Close as CloseIcon,
  Save as SaveIcon
} from "@mui/icons-material";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Navbar2 } from "../components";
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  Delete as DeleteIcon,
  Add as AddIcon 
} from "@mui/icons-material";
// Datos de ejemplo de estudiantes
const estudiantes = [
  { id: 1, cedula: '001-0101010', nombres: 'Ana María', apellidos: 'García López' },
  { id: 2, cedula: '001-0202020', nombres: 'Luis Fernando', apellidos: 'Martínez Sánchez' },
  { id: 3, cedula: '001-0303030', nombres: 'Carlos Eduardo', apellidos: 'Rodríguez Pérez' },
  { id: 4, cedula: '001-0404040', nombres: 'Sofía Alejandra', apellidos: 'Fernández Gómez' },
  { id: 5, cedula: '001-0505050', nombres: 'Juan Pablo', apellidos: 'Díaz Ramírez' },
  { id: 6, cedula: '001-0606060', nombres: 'María José', apellidos: 'Hernández Castro' },
  { id: 7, cedula: '001-0707070', nombres: 'Pedro Antonio', apellidos: 'López Mendoza' },
  { id: 8, cedula: '001-0808080', nombres: 'Laura Beatriz', apellidos: 'Gómez Vargas' },
  { id: 9, cedula: '001-0909090', nombres: 'Diego Alejandro', apellidos: 'Silva Rojas' },
  { id: 10, cedula: '001-1010101', nombres: 'Camila Valentina', apellidos: 'Torres Jiménez' }
];

// Datos de ejemplo de calificaciones
const initialCalificaciones = [
  { 
    id: 1, 
    cedula: '001-0101010', 
    nombres: 'Ana María', 
    apellidos: 'García López',
    primerParcial: 8.5,
    segundoParcial: 7.8,
    tercerParcial: 9.2,
    comportamiento: 'A',
    notaFinal: 8.5
  },
  { 
    id: 2, 
    cedula: '001-0202020', 
    nombres: 'Luis Fernando', 
    apellidos: 'Martínez Sánchez',
    primerParcial: 7.0,
    segundoParcial: 8.3,
    tercerParcial: 8.7,
    comportamiento: 'B',
    notaFinal: 8.0
  },
  { 
    id: 3, 
    cedula: '001-0303030', 
    nombres: 'Carlos Eduardo', 
    apellidos: 'Rodríguez Pérez',
    primerParcial: 9.1,
    segundoParcial: 8.9,
    tercerParcial: 9.5,
    comportamiento: 'A',
    notaFinal: 9.2
  },
  { 
    id: 4, 
    cedula: '001-0404040', 
    nombres: 'Sofía Alejandra', 
    apellidos: 'Fernández Gómez',
    primerParcial: 6.5,
    segundoParcial: 7.2,
    tercerParcial: 8.0,
    comportamiento: 'B',
    notaFinal: 7.2
  },
  { 
    id: 5, 
    cedula: '001-0505050', 
    nombres: 'Juan Pablo', 
    apellidos: 'Díaz Ramírez',
    primerParcial: 5.0,
    segundoParcial: 6.5,
    tercerParcial: 7.0,
    comportamiento: 'C',
    notaFinal: 6.2
  },
  { 
    id: 6, 
    cedula: '001-0606060', 
    nombres: 'María José', 
    apellidos: 'Hernández Castro',
    primerParcial: 9.5,
    segundoParcial: 9.2,
    tercerParcial: 9.7,
    comportamiento: 'A',
    notaFinal: 9.5
  },
  { 
    id: 7, 
    cedula: '001-0707070', 
    nombres: 'Pedro Antonio', 
    apellidos: 'López Mendoza',
    primerParcial: 7.8,
    segundoParcial: 8.1,
    tercerParcial: 8.5,
    comportamiento: 'B',
    notaFinal: 8.1
  },
  { 
    id: 8, 
    cedula: '001-0808080', 
    nombres: 'Laura Beatriz', 
    apellidos: 'Gómez Vargas',
    primerParcial: 8.0,
    segundoParcial: 8.5,
    tercerParcial: 8.2,
    comportamiento: 'A',
    notaFinal: 8.2
  },
  { 
    id: 9, 
    cedula: '001-0909090', 
    nombres: 'Diego Alejandro', 
    apellidos: 'Silva Rojas',
    primerParcial: 6.8,
    segundoParcial: 7.5,
    tercerParcial: 8.0,
    comportamiento: 'B',
    notaFinal: 7.4
  },
  { 
    id: 10, 
    cedula: '001-1010101', 
    nombres: 'Camila Valentina', 
    apellidos: 'Torres Jiménez',
    primerParcial: 9.0,
    segundoParcial: 9.5,
    tercerParcial: 9.2,
    comportamiento: 'A',
    notaFinal: 9.2
  }
];

export const HerramientasProfesor = () => {
  const [tabValue, setTabValue] = useState(0);
  const [calificaciones, setCalificaciones] = useState(initialCalificaciones);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [editedGrades, setEditedGrades] = useState<any>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStudentClick = (studentId: number) => {
    navigate(`/perfil-estudiante/${studentId}`);
  };

  const handleEditGrades = (studentId: number) => {
    const student = calificaciones.find(s => s.id === studentId);
    if (student) {
      setCurrentStudent(student);
      setEditedGrades({
        primerParcial: student.primerParcial,
        segundoParcial: student.segundoParcial,
        tercerParcial: student.tercerParcial,
        comportamiento: student.comportamiento
      });
      setOpenEditDialog(true);
    }
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    
    // Título del documento
    doc.setFontSize(18);
    doc.text('Reporte de Calificaciones - 3ro A', 14, 22);
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Datos de la tabla
    const headers = [
      'Cédula',
      'Nombres',
      'Apellidos',
      '1er Parcial',
      '2do Parcial',
      '3er Parcial',
      'Comport.',
      'Nota Final'
    ];
    
    const data = calificaciones.map(calif => [
      calif.cedula,
      calif.nombres,
      calif.apellidos,
      calif.primerParcial.toString(),
      calif.segundoParcial.toString(),
      calif.tercerParcial.toString(),
      calif.comportamiento,
      calif.notaFinal.toFixed(1)
    ]);
    
    // @ts-ignore
    doc.autoTable({
      startY: 35,
      head: [headers],
      body: data,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 15 },
        6: { cellWidth: 15 },
        7: { cellWidth: 15 }
      }
    });
    
    // Pie de página
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.getWidth() - 30,
        doc.internal.pageSize.getHeight() - 10
      );
    }
    
    doc.save('calificaciones_3roA.pdf');
    showSnackbar('PDF generado exitosamente', 'success');
  };

  const handleGradeChange = (field: string, value: string) => {
    setEditedGrades({
      ...editedGrades,
      [field]: field === 'comportamiento' ? value : parseFloat(value) || 0
    });
  };

  const calculateFinalGrade = (grades: any) => {
    return ((grades.primerParcial + grades.segundoParcial + grades.tercerParcial) / 3).toFixed(1);
  };

  const saveGrades = () => {
    if (currentStudent) {
      const finalGrade = parseFloat(calculateFinalGrade(editedGrades));
      
      const updatedCalificaciones = calificaciones.map(calif => 
        calif.id === currentStudent.id 
          ? { 
              ...calif, 
              ...editedGrades,
              notaFinal: finalGrade
            } 
          : calif
      );
      
      setCalificaciones(updatedCalificaciones);
      setOpenEditDialog(false);
      showSnackbar('Notas actualizadas correctamente', 'success');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // Columnas para el DataGrid de estudiantes
  const columns: GridColDef[] = [
    { 
      field: 'cedula', 
      headerName: 'Cédula', 
      width: 150,
      editable: false 
    },
    { 
      field: 'nombres', 
      headerName: 'Nombres', 
      width: 200,
      editable: false,
      renderCell: (params) => (
        <Button 
          color="primary"
          onClick={() => handleStudentClick(params.row.id)}
          sx={{ 
            textTransform: 'none',
            justifyContent: 'flex-start',
            width: '100%',
            textAlign: 'left'
          }}
        >
          {params.value}
        </Button>
      )
    },
    { 
      field: 'apellidos', 
      headerName: 'Apellidos', 
      width: 200,
      editable: false 
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => handleStudentClick(params.row.id)}
          >
            Ver perfil
          </Button>
        </Box>
      ),
    },
  ];

  // Función para determinar el color del comportamiento
  const getComportamientoColor = (comportamiento: string) => {
    switch(comportamiento) {
      case 'A': return 'success';
      case 'B': return 'warning';
      case 'C': return 'error';
      default: return 'default';
    }
  };

  return (
    <>
      <Navbar2 />
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        
        {/* Menú horizontal */}
        <Paper elevation={3} sx={{ mb: 3 }}>
          <Tabs 
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64
              }
            }}
          >
            <Tab 
              icon={<PeopleIcon />}
              iconPosition="start"
              label="Estudiantes" 
              sx={{ minWidth: 120 }}
            />
            <Tab 
              icon={<GradeIcon />}
              iconPosition="start"
              label="Calificaciones" 
              sx={{ minWidth: 120 }}
            />
            <Tab 
              icon={<AssignmentIcon />}
              iconPosition="start"
              label="Primer Parcial" 
              sx={{ minWidth: 120 }}
            />
            <Tab 
              icon={<AssignmentIcon />}
              iconPosition="start"
              label="Segundo Parcial" 
              sx={{ minWidth: 120 }}
            />
            <Tab 
              icon={<AssignmentIcon />}
              iconPosition="start"
              label="Tercer Parcial" 
              sx={{ minWidth: 120 }}
            />
          </Tabs>
          <Divider />
        </Paper>

        {/* Contenido de cada pestaña */}
        <Box sx={{ p: 2 }}>
          {tabValue === 0 && (
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={estudiantes}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
              />
            </Box>
          )}
          
          {tabValue === 1 && (
            <>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PdfIcon />}
                  onClick={handleGeneratePdf}
                  sx={{ textTransform: 'none' }}
                >
                  Generar PDF con notas
                </Button>
              </Stack>
              
              <TableContainer component={Paper} elevation={3}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Cédula</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Nombres</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Apellidos</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>1er Parcial</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>2do Parcial</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>3er Parcial</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Comport.</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nota Final</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {calificaciones.map((calif) => (
                      <TableRow key={calif.id} hover>
                        <TableCell>{calif.cedula}</TableCell>
                        <TableCell>
                          <Button 
                            color="primary"
                            onClick={() => handleStudentClick(calif.id)}
                            sx={{ 
                              textTransform: 'none',
                              justifyContent: 'flex-start',
                              padding: 0,
                              minWidth: 'auto',
                              fontSize: 'inherit',
                              '&:hover': {
                                backgroundColor: 'transparent',
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            {calif.nombres}
                          </Button>
                        </TableCell>
                        <TableCell>{calif.apellidos}</TableCell>
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
                          fontWeight: 'bold'
                        }}>
                          {calif.notaFinal.toFixed(1)}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditGrades(calif.id)}
                            sx={{ textTransform: 'none' }}
                          >
                            Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          
          {tabValue === 2 && (
            <Box>
              {/* Tareas en casa */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Tareas en casa
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de tareas */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-tarea-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Tarea 1: Ejercicios de álgebra"
                      secondary="Resolver los problemas de la página 45 del libro de texto"
                    />
                  </ListItem>
                  
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-tarea-2')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Tarea 2: Investigación histórica"
                      secondary="Preparar un resumen sobre la Revolución Industrial"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Talleres */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Talleres
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de talleres */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-taller-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Taller 1: Experimentos científicos"
                      secondary="Realizar los experimentos de la guía práctica"
                    />
                  </ListItem>
                  
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-taller-2')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Taller 2: Análisis literario"
                      secondary="Analizar el capítulo 3 de la obra asignada"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Trabajo en clase */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Trabajo en clase
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de trabajos */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-trabajo-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Trabajo 1: Proyecto grupal"
                      secondary="Desarrollar la primera fase del proyecto en equipos"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Prueba */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Prueba
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de pruebas */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-prueba-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Prueba 1: Unidad 1"
                      secondary="Evaluación escrita sobre los primeros temas"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Examen */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Examen
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de exámenes */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-examen-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Examen Parcial"
                      secondary="Evaluación comprensiva de todo el parcial"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Botones de acción */}
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 3,
                flexWrap: 'wrap'
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Editar Actividad
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AddIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Agregar Actividad
                </Button>
              </Box>
            </Box>
          )}
          {tabValue === 3 && (
            <Box>
              {/* Tareas en casa */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Tareas en casa
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de tareas */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-tarea-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Tarea 1: Ejercicios de álgebra"
                      secondary="Resolver los problemas de la página 45 del libro de texto"
                    />
                  </ListItem>
                  
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-tarea-2')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Tarea 2: Investigación histórica"
                      secondary="Preparar un resumen sobre la Revolución Industrial"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Talleres */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Talleres
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de talleres */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-taller-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Taller 1: Experimentos científicos"
                      secondary="Realizar los experimentos de la guía práctica"
                    />
                  </ListItem>
                  
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-taller-2')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Taller 2: Análisis literario"
                      secondary="Analizar el capítulo 3 de la obra asignada"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Trabajo en clase */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Trabajo en clase
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de trabajos */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-trabajo-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Trabajo 1: Proyecto grupal"
                      secondary="Desarrollar la primera fase del proyecto en equipos"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Prueba */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Prueba
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de pruebas */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-prueba-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Prueba 1: Unidad 1"
                      secondary="Evaluación escrita sobre los primeros temas"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Examen */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Examen
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de exámenes */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-examen-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Examen Parcial"
                      secondary="Evaluación comprensiva de todo el parcial"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Botones de acción */}
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 3,
                flexWrap: 'wrap'
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Editar Actividad
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AddIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Agregar Actividad
                </Button>
              </Box>
            </Box>
          )}
          {tabValue === 4 && (
            <Box>
              {/* Tareas en casa */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Tareas en casa
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de tareas */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-tarea-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Tarea 1: Ejercicios de álgebra"
                      secondary="Resolver los problemas de la página 45 del libro de texto"
                    />
                  </ListItem>
                  
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-tarea-2')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Tarea 2: Investigación histórica"
                      secondary="Preparar un resumen sobre la Revolución Industrial"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Talleres */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Talleres
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de talleres */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-taller-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Taller 1: Experimentos científicos"
                      secondary="Realizar los experimentos de la guía práctica"
                    />
                  </ListItem>
                  
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-taller-2')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Taller 2: Análisis literario"
                      secondary="Analizar el capítulo 3 de la obra asignada"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Trabajo en clase */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Trabajo en clase
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de trabajos */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-trabajo-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Trabajo 1: Proyecto grupal"
                      secondary="Desarrollar la primera fase del proyecto en equipos"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Prueba */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Prueba
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de pruebas */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-prueba-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Prueba 1: Unidad 1"
                      secondary="Evaluación escrita sobre los primeros temas"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Examen */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Examen
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {/* Lista de exámenes */}
                <List>
                  <ListItem 
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/ruta-examen-1')}
                          sx={{ 
                            textTransform: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Ingresar
                        </Button>
                        <IconButton edge="end" aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary="Examen Parcial"
                      secondary="Evaluación comprensiva de todo el parcial"
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Botones de acción */}
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 3,
                flexWrap: 'wrap'
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Editar Actividad
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AddIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Agregar Actividad
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Container>

      {/* Diálogo para editar notas */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Editar notas de {currentStudent?.nombres} {currentStudent?.apellidos}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Primer Parcial"
              type="number"
              fullWidth
              margin="normal"
              value={editedGrades.primerParcial || ''}
              onChange={(e) => handleGradeChange('primerParcial', e.target.value)}
              inputProps={{ min: 0, max: 10, step: 0.1 }}
            />
            <TextField
              label="Segundo Parcial"
              type="number"
              fullWidth
              margin="normal"
              value={editedGrades.segundoParcial || ''}
              onChange={(e) => handleGradeChange('segundoParcial', e.target.value)}
              inputProps={{ min: 0, max: 10, step: 0.1 }}
            />
            <TextField
              label="Tercer Parcial"
              type="number"
              fullWidth
              margin="normal"
              value={editedGrades.tercerParcial || ''}
              onChange={(e) => handleGradeChange('tercerParcial', e.target.value)}
              inputProps={{ min: 0, max: 10, step: 0.1 }}
            />
            <TextField
              label="Comportamiento"
              select
              fullWidth
              margin="normal"
              value={editedGrades.comportamiento || ''}
              onChange={(e) => handleGradeChange('comportamiento', e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="A">A - Excelente</option>
              <option value="B">B - Bueno</option>
              <option value="C">C - Mejorable</option>
            </TextField>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Nota Final: {calculateFinalGrade(editedGrades)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseEditDialog} 
            startIcon={<CloseIcon />}
            sx={{ textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={saveGrades} 
            color="primary" 
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ textTransform: 'none' }}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HerramientasProfesor;