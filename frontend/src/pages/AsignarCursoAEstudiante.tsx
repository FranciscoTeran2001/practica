import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Stack,
  Paper,
  Chip,
  Divider,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Navbar1 } from "../components/navbar1";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ArrowBack, CheckCircle, GroupAdd } from '@mui/icons-material';

// Datos de ejemplo de estudiantes
const estudiantes = [
  { id: 1, cedula: '001-0101010', nombres: 'Ana María', apellidos: 'García López', tipoUsuario: 'Estudiante' },
  { id: 2, cedula: '001-0202020', nombres: 'Luis Fernando', apellidos: 'Martínez Sánchez', tipoUsuario: 'Estudiante' },
  { id: 3, cedula: '001-0303030', nombres: 'Carlos Eduardo', apellidos: 'Rodríguez Pérez', tipoUsuario: 'Estudiante' },
  { id: 4, cedula: '001-0404040', nombres: 'Sofía Alejandra', apellidos: 'Fernández Gómez', tipoUsuario: 'Estudiante' },
  { id: 5, cedula: '001-0505050', nombres: 'Juan Pablo', apellidos: 'Díaz Ramírez', tipoUsuario: 'Estudiante' },
  { id: 6, cedula: '001-0606060', nombres: 'María José', apellidos: 'Hernández Castro', tipoUsuario: 'Estudiante' },
  { id: 7, cedula: '001-0707070', nombres: 'Pedro Antonio', apellidos: 'López Mendoza', tipoUsuario: 'Estudiante' },
  { id: 8, cedula: '001-0808080', nombres: 'Laura Beatriz', apellidos: 'Gómez Vargas', tipoUsuario: 'Estudiante' },
  { id: 9, cedula: '001-0909090', nombres: 'Diego Alejandro', apellidos: 'Silva Rojas', tipoUsuario: 'Estudiante' },
  { id: 10, cedula: '001-1010101', nombres: 'Camila Valentina', apellidos: 'Torres Jiménez', tipoUsuario: 'Estudiante' }
];

// Datos de ejemplo de cursos
const cursos = [
  { id: 1, nombre: '2do A', paralelo: 'A', capacidad: 30 },
  { id: 2, nombre: '2do B', paralelo: 'B', capacidad: 28 },
  { id: 3, nombre: '3ro A', paralelo: 'A', capacidad: 32 },
];

// Datos de ejemplo de años lectivos
const periodosAcademicos = [
  { id: 1, nombre: 'Diciembre 2024 - Enero 2025', estado: 'Activo' },
  { id: 2, nombre: 'Febrero 2025 - Abril 2025', estado: 'Planificado' },
  { id: 3, nombre: 'Mayo 2025 - Julio 2025', estado: 'Planificado' },
  { id: 4, nombre: 'Agosto 2025 - Octubre 2025', estado: 'Planificado' },
];

// Columnas de la tabla
const columns: GridColDef[] = [
  { 
    field: 'cedula', 
    headerName: 'Cédula', 
    width: 150,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-style'
  },
  { 
    field: 'nombres', 
    headerName: 'Nombres', 
    width: 200,
    headerAlign: 'center',
    headerClassName: 'header-style'
  },
  { 
    field: 'apellidos', 
    headerName: 'Apellidos', 
    width: 200,
    headerAlign: 'center',
    headerClassName: 'header-style'
  },
  { 
    field: 'tipoUsuario', 
    headerName: 'Tipo de Usuario', 
    width: 180,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-style',
    renderCell: (params) => (
      <Chip 
        label={params.value} 
        color="primary" 
        size="small"
        sx={{ 
          backgroundColor: '#e3f2fd',
          color: '#1976d2',
          fontWeight: '500'
        }}
      />
    )
  },
];

export const AsignarCursoAEstudiante = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [selectedStudents, setSelectedStudents] = React.useState<number[]>([]);
    const [selectedCourse, setSelectedCourse] = React.useState('');
    const [selectedPeriodo, setSelectedPeriodo] = React.useState('');

    const handleSelectionChange = (newSelection: number[]) => {
        setSelectedStudents(newSelection);
    };

    const handleAssignCourse = () => {
        if (!selectedCourse) {
            alert('Por favor seleccione un curso');
            return;
        }
        if (!selectedPeriodo) {
            alert('Por favor seleccione un período académico');
            return;
        }
        if (selectedStudents.length === 0) {
            alert('Por favor seleccione al menos un estudiante');
            return;
        }
        
        const cursoSeleccionado = cursos.find(c => c.id === Number(selectedCourse))?.nombre;
        const periodoSelccionado = periodosAcademicos.find(p => p.id === Number(selectedPeriodo))?.nombre;
        
        console.log("Período académico:", periodoSelccionado);
        console.log("Curso seleccionado:", cursoSeleccionado);
        console.log("Estudiantes seleccionados:", selectedStudents);
        
        alert(`Curso ${cursoSeleccionado} asignado a ${selectedStudents.length} estudiantes para el período ${periodoSelccionado}`);
    };

    return (
        <>
            <Navbar1 />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
                    {/* Encabezado */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 3,
                        gap: 2
                    }}>
                        <GroupAdd fontSize="large" color="primary" />
                        <Typography variant="h4" sx={{ 
                            fontWeight: 'bold',
                            color: theme.palette.primary.main
                        }}>
                            Asignar Curso a Estudiantes
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    {/* Selección de período académico */}
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Seleccione el período académico</InputLabel>
                        <Select
                            value={selectedPeriodo}
                            label="Seleccione el período académico"
                            onChange={(e) => setSelectedPeriodo(e.target.value)}
                            sx={{ 
                                '& .MuiSelect-select': {
                                    py: 1.5
                                }
                            }}
                        >
                            {periodosAcademicos.map((periodo) => (
                                <MenuItem key={periodo.id} value={periodo.id}>
                                    {periodo.nombre} - {periodo.estado}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Selección de curso */}
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel>Seleccione el curso</InputLabel>
                        <Select
                            value={selectedCourse}
                            label="Seleccione el curso"
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            sx={{ 
                                '& .MuiSelect-select': {
                                    py: 1.5
                                }
                            }}
                        >
                            {cursos.map((curso) => (
                                <MenuItem key={curso.id} value={curso.id}>
                                    {curso.nombre} - Paralelo {curso.paralelo} (Capacidad: {curso.capacidad})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Tabla de estudiantes */}
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: '500' }}>
                        Seleccione los estudiantes ({selectedStudents.length} seleccionados)
                    </Typography>
                    
                    <Box sx={{ 
                        height: 400, 
                        width: '100%', 
                        mb: 3,
                        '& .header-style': {
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                            fontWeight: 'bold'
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: theme.palette.action.hover
                        },
                        '& .MuiDataGrid-row.Mui-selected': {
                            backgroundColor: theme.palette.action.selected,
                            '&:hover': {
                                backgroundColor: theme.palette.action.selected
                            }
                        }
                    }}>
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
                            checkboxSelection
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={handleSelectionChange}
                            sx={{
                                border: 'none',
                                '& .MuiDataGrid-cell:focus': {
                                    outline: 'none'
                                }
                            }}
                        />
                    </Box>

                    {/* Resumen y acciones */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mt: 2,
                        mb: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle color="success" />
                            <Typography variant="body2">
                                {selectedStudents.length} estudiantes seleccionados
                            </Typography>
                        </Box>
                        
                        <Stack direction="row" spacing={2}>
                            <Button 
                                variant="outlined" 
                                onClick={() => navigate(-1)}
                                startIcon={<ArrowBack />}
                                sx={{ 
                                    px: 3,
                                    borderRadius: '8px',
                                    borderWidth: '2px',
                                    '&:hover': {
                                        borderWidth: '2px'
                                    }
                                }}
                            >
                                Regresar
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={handleAssignCourse}
                                disabled={selectedStudents.length === 0 || !selectedCourse || !selectedPeriodo}
                                startIcon={<GroupAdd />}
                                sx={{ 
                                    px: 3,
                                    borderRadius: '8px',
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                    '&:hover': {
                                        opacity: 0.9
                                    }
                                }}
                            >
                                Asignar Curso
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default AsignarCursoAEstudiante;