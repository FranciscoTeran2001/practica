import { 
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Badge,
  LinearProgress
} from '@mui/material';
import { 
  CloudUpload, 
  Assignment, 
  Class, 
  Quiz, 
  Assessment, 
  Edit,
  CheckCircle,
  Pending,
  Grade,
  Upload,
  Description
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar3 } from '../components';

// Componente para input file oculto
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Styled components para elementos personalizados
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  width: '100%',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.12)'
  }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: '64px',
  minWidth: '200px', // Aumenta este valor para hacer las pestañas más anchas
  width: 'auto', // Permite que las pestañas se expandan según el contenido
  padding: '6px 16px', // Aumenta el padding horizontal para más espacio
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  }
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  backgroundColor: status === 'completed' 
    ? theme.palette.success.light 
    : status === 'pending' 
      ? theme.palette.warning.light 
      : theme.palette.primary.light,
  color: status === 'completed' 
    ? theme.palette.success.dark 
    : status === 'pending' 
      ? theme.palette.warning.dark 
      : theme.palette.primary.dark
}));

// Datos de ejemplo para la materia
const materiaData = {
  id: 1,
  nombre: "Matemáticas Avanzadas",
  profesor: "Ing. Carlos Cerón",
  progreso: 65,
  tareas: [
    { 
      id: 1, 
      nombre: "Ejercicios de álgebra lineal", 
      fechaEntrega: "2023-11-15", 
      entregado: true,
      tipo: "Tarea",
      puntos: 20
    },
    { 
      id: 2, 
      nombre: "Problemas de geometría analítica", 
      fechaEntrega: "2023-11-20", 
      entregado: false,
      tipo: "Proyecto",
      puntos: 30
    },
    { 
      id: 3, 
      nombre: "Demostraciones matemáticas", 
      fechaEntrega: "2023-11-25", 
      entregado: false,
      tipo: "Ensayo",
      puntos: 25
    }
  ],
  actividades: [
    { 
      id: 1, 
      tipo: "Participación en clase", 
      fecha: "2023-11-10", 
      completado: true,
      descripcion: "Participación en discusión de teoremas"
    },
    { 
      id: 2, 
      tipo: "Trabajo en equipo", 
      fecha: "2023-11-17", 
      completado: false,
      descripcion: "Resolver problemas en grupos de 3"
    }
  ],
  talleres: [
    { 
      id: 1, 
      tema: "Ecuaciones diferenciales", 
      fecha: "2023-11-12", 
      archivoSubido: false,
      descripcion: "Resolver 10 ecuaciones diferenciales"
    },
    { 
      id: 2, 
      tema: "Análisis vectorial", 
      fecha: "2023-11-19", 
      archivoSubido: true,
      descripcion: "Problemas de campos vectoriales"
    }
  ],
  pruebas: [
    { 
      id: 1, 
      tema: "Unidad 1 - Fundamentos", 
      fecha: "2023-11-25", 
      calificacion: 85,
      porcentaje: 20
    },
    { 
      id: 2, 
      tema: "Unidad 2 - Álgebra", 
      fecha: "2023-12-02", 
      calificacion: null,
      porcentaje: 25
    }
  ],
  examenes: [
    { 
      id: 1, 
      tema: "Primer Parcial", 
      fecha: "2023-12-05", 
      calificacion: null,
      porcentaje: 30
    },
    { 
      id: 2, 
      tema: "Segundo Parcial", 
      fecha: "2023-12-15", 
      calificacion: 78,
      porcentaje: 35
    }
  ]
};

const ActividadesEstudiante = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("Archivo seleccionado:", event.target.files[0]);
  };

  const materia = materiaData;

  // Función para obtener el icono según el tipo de actividad
  const getActivityIcon = (type) => {
    switch(type) {
      case 'Tarea': return <Assignment />;
      case 'Proyecto': return <Description />;
      case 'Ensayo': return <Edit />;
      default: return <Assignment />;
    }
  };

  return (
    <>
      <Navbar3 />
      <Container
        maxWidth="xl"
        sx={{
          mt: 8,
          mb: 4,
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        {/* Header con información del curso */}
        <StyledPaper sx={{ 
          p: 3, 
          mb: 3, 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {materia.nombre}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                <Box component="span" sx={{ fontWeight: 'medium' }}>Profesor:</Box> {materia.profesor}
              </Typography>
            </Box>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'primary.main',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              {materia.nombre.charAt(0)}
            </Avatar>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Progreso del curso: {materia.progreso}%
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {materia.tareas.filter(t => t.entregado).length}/{materia.tareas.length} tareas completadas
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={materia.progreso} 
              sx={{ 
                height: 10, 
                borderRadius: 5,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)'
                }
              }} 
            />
          </Box>
        </StyledPaper>

        {/* Pestañas */}
        <StyledPaper elevation={3} sx={{ mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: '4px 4px 0 0'
              }
            }}
          >
            <StyledTab label="Tareas" icon={<Assignment />} iconPosition="start" />
            <StyledTab label="Actividades" icon={<Class />} iconPosition="start" />
            <StyledTab label="Talleres" icon={<Edit />} iconPosition="start" />
            <StyledTab label="Pruebas" icon={<Quiz />} iconPosition="start" />
            <StyledTab label="Exámenes" icon={<Assessment />} iconPosition="start" />
          </Tabs>
        </StyledPaper>

        {/* Contenido de las pestañas */}
        <StyledPaper elevation={3} sx={{ p: 3, mb: 3 }}>
          {tabValue === 0 && ( // Tareas
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Assignment sx={{ mr: 1, color: 'primary.main' }} /> Tareas Pendientes
              </Typography>
              <List disablePadding>
                {materia.tareas.map((tarea) => (
                  <Box key={tarea.id}>
                    <ListItem sx={{ 
                      py: 2, 
                      px: 0,
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <Avatar sx={{ 
                        mr: 2, 
                        bgcolor: tarea.entregado ? 'success.light' : 'warning.light',
                        color: tarea.entregado ? 'success.dark' : 'warning.dark'
                      }}>
                        {getActivityIcon(tarea.tipo)}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {tarea.nombre}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" component="span" sx={{ display: 'block' }}>
                              {tarea.tipo} • {tarea.puntos} puntos
                            </Typography>
                            <Typography variant="body2" component="span" sx={{ display: 'block' }}>
                              Fecha de entrega: {tarea.fechaEntrega}
                            </Typography>
                          </>
                        }
                        sx={{ flex: '1 1 60%', pr: 2 }}
                      />
                      {tarea.entregado ? (
                        <StatusChip 
                          icon={<CheckCircle />} 
                          label="Entregado" 
                          status="completed"
                        />
                      ) : (
                        <Button
                          component="label"
                          variant="contained"
                          startIcon={<Upload />}
                          size="medium"
                          sx={{
                            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            '&:hover': {
                              boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                            }
                          }}
                        >
                          Subir
                          <VisuallyHiddenInput 
                            type="file" 
                            onChange={handleFileChange}
                          />
                        </Button>
                      )}
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
              </List>
            </Box>
          )}

          {tabValue === 1 && ( // Actividades
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Class sx={{ mr: 1, color: 'primary.main' }} /> Actividades en Clase
              </Typography>
              <List disablePadding>
                {materia.actividades.map((actividad) => (
                  <Box key={actividad.id}>
                    <ListItem sx={{ 
                      py: 2, 
                      px: 0,
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <Avatar sx={{ 
                        mr: 2, 
                        bgcolor: actividad.completado ? 'success.light' : 'warning.light',
                        color: actividad.completado ? 'success.dark' : 'warning.dark'
                      }}>
                        {actividad.completado ? <CheckCircle /> : <Pending />}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {actividad.tipo}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" component="span" sx={{ display: 'block' }}>
                              {actividad.descripcion}
                            </Typography>
                            <Typography variant="body2" component="span" sx={{ display: 'block' }}>
                              Fecha: {actividad.fecha}
                            </Typography>
                          </>
                        }
                        sx={{ flex: '1 1 60%', pr: 2 }}
                      />
                      <StatusChip 
                        label={actividad.completado ? "Completado" : "Pendiente"} 
                        status={actividad.completado ? "completed" : "pending"}
                      />
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
              </List>
            </Box>
          )}

          {tabValue === 2 && ( // Talleres
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Edit sx={{ mr: 1, color: 'primary.main' }} /> Talleres Prácticos
              </Typography>
              <List disablePadding>
                {materia.talleres.map((taller) => (
                  <Box key={taller.id}>
                    <ListItem sx={{ 
                      py: 2, 
                      px: 0,
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <Avatar sx={{ 
                        mr: 2, 
                        bgcolor: taller.archivoSubido ? 'success.light' : 'warning.light',
                        color: taller.archivoSubido ? 'success.dark' : 'warning.dark'
                      }}>
                        <Description />
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {taller.tema}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" component="span" sx={{ display: 'block' }}>
                              {taller.descripcion}
                            </Typography>
                            <Typography variant="body2" component="span" sx={{ display: 'block' }}>
                              Fecha: {taller.fecha}
                            </Typography>
                          </>
                        }
                        sx={{ flex: '1 1 60%', pr: 2 }}
                      />
                      {taller.archivoSubido ? (
                        <StatusChip 
                          icon={<CheckCircle />} 
                          label="Entregado" 
                          status="completed"
                        />
                      ) : (
                        <Button
                          component="label"
                          variant="contained"
                          startIcon={<CloudUpload />}
                          size="medium"
                          sx={{
                            background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            '&:hover': {
                              boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                            }
                          }}
                        >
                          Subir taller
                          <VisuallyHiddenInput 
                            type="file" 
                            onChange={handleFileChange}
                          />
                        </Button>
                      )}
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
              </List>
            </Box>
          )}

          {tabValue === 3 && ( // Pestaña de Pruebas
            <Box>
              <Typography variant="h6" gutterBottom>
                Pruebas
              </Typography>
              <List>
                {materia.pruebas.map((prueba) => (
                  <ListItem key={prueba.id} sx={{ py: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                      <Assessment />
                    </Avatar>
                    <ListItemText
                      primary={prueba.tema}
                      secondary={`Fecha: ${prueba.fecha} - Peso: ${prueba.porcentaje}%`}
                      sx={{ flex: '1 1 auto' }} // Asegura que el texto ocupe el espacio disponible
                    />
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      minWidth: '150px', // Ancho mínimo para la sección de calificación
                      justifyContent: 'flex-end' // Alinea los elementos a la derecha
                    }}>
                      {prueba.calificacion ? (
                        <Chip 
                          label={`${prueba.calificacion}/100`} 
                          color="primary"
                          variant="outlined"
                          sx={{ 
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            mr: 2
                          }}
                        />
                      ) : (
                        <StatusChip 
                          label="Pendiente" 
                          status="pending" 
                          sx={{ mr: 2 }}
                        />
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {tabValue === 4 && ( // Pestaña de Exámenes
            <Box>
              <Typography variant="h6" gutterBottom>
                Exámenes
              </Typography>
              <List>
                {materia.examenes.map((examen) => (
                  <ListItem key={examen.id} sx={{ py: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'error.main' }}>
                      <Grade />
                    </Avatar>
                    <ListItemText
                      primary={examen.tema}
                      secondary={`Fecha: ${examen.fecha} - Peso: ${examen.porcentaje}%`}
                      sx={{ flex: '1 1 auto' }}
                    />
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      minWidth: '150px',
                      justifyContent: 'flex-end'
                    }}>
                      {examen.calificacion ? (
                        <Chip 
                          label={`${examen.calificacion}/100`} 
                          color="secondary"
                          variant="outlined"
                          sx={{ 
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            mr: 2
                          }}
                        />
                      ) : (
                        <StatusChip 
                          label="Pendiente" 
                          status="pending" 
                          sx={{ mr: 2 }}
                        />
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </StyledPaper>

        {selectedFile && (
          <StyledPaper sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Description sx={{ mr: 2, color: 'primary.main', fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Archivo seleccionado:
                </Typography>
                <Typography variant="body1">
                  {selectedFile.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button 
                variant="outlined" 
                color="secondary"
                onClick={() => setSelectedFile(null)}
                sx={{ textTransform: 'none' }}
              >
                Cancelar
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<CloudUpload />}
                onClick={() => {
                  console.log("Subiendo archivo...");
                  setSelectedFile(null);
                }}
                sx={{
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                  }
                }}
              >
                Confirmar envío
              </Button>
            </Box>
          </StyledPaper>
        )}
      </Container>
    </>
  );
};

export default ActividadesEstudiante;