import { Container, Typography, Paper, Tabs, Tab, Box, Button, List, ListItem, ListItemText, Divider, Chip, Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CloudUpload, Assignment, Class, Quiz, Assessment, Edit, CheckCircle, Grade, Upload, Description } from '@mui/icons-material';
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
  minWidth: '200px',
  width: 'auto',
  padding: '6px 16px',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  }
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.dark
}));

// Datos de ejemplo para la materia
const initialMateriaData = {
  id: 1,
  nombre: "Matemáticas Avanzadas",
  profesor: "Ing. Carlos Cerón",
  tareas: [
    { 
      id: 1, 
      nombre: "Ejercicios de álgebra lineal", 
      fechaEntrega: "2023-11-15", 
      entregado: true,
      tipo: "Tarea",
      archivo: "algebra_lineal.pdf"
    },
    { 
      id: 2, 
      nombre: "Problemas de geometría analítica", 
      fechaEntrega: "2023-11-20", 
      entregado: false,
      tipo: "Proyecto",
      archivo: null
    }
  ],
  actividades: [
    { 
      id: 1, 
      tipo: "Participación en clase", 
      fecha: "2023-11-10", 
      completado: true,
      descripcion: "Participación en discusión de teoremas",
      archivo: "participacion.pdf"
    },
    { 
      id: 2, 
      tipo: "Trabajo en equipo", 
      fecha: "2023-11-17", 
      completado: false,
      descripcion: "Resolver problemas en grupos de 3",
      archivo: null
    }
  ],
  talleres: [
    { 
      id: 1, 
      tema: "Ecuaciones diferenciales", 
      fecha: "2023-11-12", 
      archivoSubido: true,
      descripcion: "Resolver 10 ecuaciones diferenciales",
      archivo: "ecuaciones_diferenciales.pdf"
    },
    { 
      id: 2, 
      tema: "Análisis vectorial", 
      fecha: "2023-11-19", 
      archivoSubido: false,
      descripcion: "Problemas de campos vectoriales",
      archivo: null
    }
  ],
  pruebas: [
    { 
      id: 1, 
      tema: "Unidad 1 - Fundamentos", 
      fecha: "2023-11-25", 
      completado: true,
      archivo: "prueba_fundamentos.pdf"
    },
    { 
      id: 2, 
      tema: "Unidad 2 - Álgebra", 
      fecha: "2023-12-02", 
      completado: false,
      archivo: null
    }
  ],
  examenes: [
    { 
      id: 1, 
      tema: "Primer Parcial", 
      fecha: "2023-12-05", 
      completado: false,
      archivo: null
    },
    { 
      id: 2, 
      tema: "Segundo Parcial", 
      fecha: "2023-12-15", 
      completado: true,
      archivo: "segundo_parcial.pdf"
    }
  ]
};

const ActividadesEstudiante = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [actividadesState, setActividadesState] = useState(initialMateriaData);
  const [openDialog, setOpenDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileChange = (event, activity) => {
    setSelectedFile(event.target.files[0]);
    setCurrentActivity(activity);
    handleFileUpload(activity.type, activity.id, event.target.files[0]);
  };

  const handleFileUpload = (tipo, id, file) => {
    if (!file) return;
    
    setActividadesState(prev => {
      const newState = {...prev};
      const fileName = file.name;
      
      if (tipo === 'tarea') {
        newState.tareas = newState.tareas.map(t => 
          t.id === id ? {...t, entregado: true, archivo: fileName} : t
        );
      } else if (tipo === 'taller') {
        newState.talleres = newState.talleres.map(t => 
          t.id === id ? {...t, archivoSubido: true, archivo: fileName} : t
        );
      } else if (tipo === 'actividad') {
        newState.actividades = newState.actividades.map(a => 
          a.id === id ? {...a, completado: true, archivo: fileName} : a
        );
      } else if (tipo === 'prueba') {
        newState.pruebas = newState.pruebas.map(p => 
          p.id === id ? {...p, completado: true, archivo: fileName} : p
        );
      } else if (tipo === 'examen') {
        newState.examenes = newState.examenes.map(e => 
          e.id === id ? {...e, completado: true, archivo: fileName} : e
        );
      }
      
      return newState;
    });
    
    setSelectedFile(null);
    setCurrentActivity(null);
  };

  const handleModifyFile = (activity) => {
    setCurrentActivity(activity);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentActivity(null);
  };

  const handleConfirmModify = (event) => {
    if (event.target.files[0]) {
      handleFileUpload(currentActivity.type, currentActivity.id, event.target.files[0]);
    }
    handleCloseDialog();
  };

  // Función para obtener el icono según el tipo de actividad
  const getActivityIcon = (type) => {
    switch(type) {
      case 'Tarea': return <Assignment />;
      case 'Proyecto': return <Description />;
      case 'Ensayo': return <Edit />;
      default: return <Assignment />;
    }
  };

  // Función para determinar el tipo de actividad según la pestaña
  const getActivityType = (tabIndex) => {
    switch(tabIndex) {
      case 0: return 'tarea';
      case 1: return 'actividad';
      case 2: return 'taller';
      case 3: return 'prueba';
      case 4: return 'examen';
      default: return 'tarea';
    }
  };

  return (
    <>
      <Navbar3 />
      <Container maxWidth="xl" sx={{ mt: 8, mb: 4, minHeight: 'calc(100vh - 100px)' }}>
        {/* Header con información del curso */}
        <StyledPaper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {actividadesState.nombre}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                <Box component="span" sx={{ fontWeight: 'medium' }}>Profesor:</Box> {actividadesState.profesor}
              </Typography>
            </Box>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem', fontWeight: 'bold' }}>
              {actividadesState.nombre.charAt(0)}
            </Avatar>
          </Box>
        </StyledPaper>

        {/* Pestañas */}
        <StyledPaper elevation={3} sx={{ mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable" 
            scrollButtons="auto"
            sx={{ '& .MuiTabs-indicator': { height: 4, borderRadius: '4px 4px 0 0' } }}
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
                <Assignment sx={{ mr: 1, color: 'primary.main' }} /> Tareas
              </Typography>
              <List disablePadding>
                {actividadesState.tareas.map((tarea) => (
                  <Box key={tarea.id}>
                    <ListItem sx={{ py: 2, px: 0, display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Avatar sx={{ 
                        mr: 2, 
                        bgcolor: tarea.entregado ? 'success.light' : 'grey.300',
                        color: tarea.entregado ? 'success.dark' : 'grey.600'
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
                              {tarea.tipo} • Fecha de entrega: {tarea.fechaEntrega}
                            </Typography>
                            {tarea.entregado && tarea.archivo && (
                              <Typography variant="body2" component="span" sx={{ display: 'block', fontStyle: 'italic' }}>
                                Archivo enviado: {tarea.archivo}
                              </Typography>
                            )}
                          </>
                        }
                        sx={{ flex: '1 1 60%', pr: 2 }}
                      />
                      {tarea.entregado ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <StatusChip icon={<CheckCircle />} label="Entregado" />
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleModifyFile({...tarea, type: 'tarea'})}
                            sx={{ mt: 1 }}
                          >
                            Modificar
                          </Button>
                        </Box>
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
                            onChange={(e) => handleFileChange(e, {...tarea, type: 'tarea'})}
                            accept=".pdf"
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
                {actividadesState.actividades.map((actividad) => (
                  <Box key={actividad.id}>
                    <ListItem sx={{ py: 2, px: 0, display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Avatar sx={{ 
                        mr: 2, 
                        bgcolor: actividad.completado ? 'success.light' : 'grey.300',
                        color: actividad.completado ? 'success.dark' : 'grey.600'
                      }}>
                        {actividad.completado ? <CheckCircle /> : <Assignment />}
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
                              {actividad.descripcion} • Fecha: {actividad.fecha}
                            </Typography>
                            {actividad.completado && actividad.archivo && (
                              <Typography variant="body2" component="span" sx={{ display: 'block', fontStyle: 'italic' }}>
                                Archivo enviado: {actividad.archivo}
                              </Typography>
                            )}
                          </>
                        }
                        sx={{ flex: '1 1 60%', pr: 2 }}
                      />
                      {actividad.completado ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <StatusChip label="Completado" />
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleModifyFile({...actividad, type: 'actividad'})}
                            sx={{ mt: 1 }}
                          >
                            Modificar
                          </Button>
                        </Box>
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
                            onChange={(e) => handleFileChange(e, {...actividad, type: 'actividad'})}
                            accept=".pdf"
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

          {tabValue === 2 && ( // Talleres
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Edit sx={{ mr: 1, color: 'primary.main' }} /> Talleres Prácticos
              </Typography>
              <List disablePadding>
                {actividadesState.talleres.map((taller) => (
                  <Box key={taller.id}>
                    <ListItem sx={{ py: 2, px: 0, display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Avatar sx={{ 
                        mr: 2, 
                        bgcolor: taller.archivoSubido ? 'success.light' : 'grey.300',
                        color: taller.archivoSubido ? 'success.dark' : 'grey.600'
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
                              {taller.descripcion} • Fecha: {taller.fecha}
                            </Typography>
                            {taller.archivoSubido && taller.archivo && (
                              <Typography variant="body2" component="span" sx={{ display: 'block', fontStyle: 'italic' }}>
                                Archivo enviado: {taller.archivo}
                              </Typography>
                            )}
                          </>
                        }
                        sx={{ flex: '1 1 60%', pr: 2 }}
                      />
                      {taller.archivoSubido ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <StatusChip icon={<CheckCircle />} label="Entregado" />
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleModifyFile({...taller, type: 'taller'})}
                            sx={{ mt: 1 }}
                          >
                            Modificar
                          </Button>
                        </Box>
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
                            onChange={(e) => handleFileChange(e, {...taller, type: 'taller'})}
                            accept=".pdf"
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

          {tabValue === 3 && ( // Pruebas
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Quiz sx={{ mr: 1, color: 'primary.main' }} /> Pruebas
              </Typography>
              <List disablePadding>
                {actividadesState.pruebas.map((prueba) => (
                  <Box key={prueba.id}>
                    <ListItem sx={{ py: 2, px: 0, display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                        <Assessment />
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {prueba.tema}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2">
                              Fecha: {prueba.fecha}
                            </Typography>
                            {prueba.completado && prueba.archivo && (
                              <Typography variant="body2" component="span" sx={{ display: 'block', fontStyle: 'italic' }}>
                                Archivo enviado: {prueba.archivo}
                              </Typography>
                            )}
                          </>
                        }
                        sx={{ flex: '1 1 auto' }}
                      />
                      {prueba.completado ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <StatusChip label="Completado" />
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleModifyFile({...prueba, type: 'prueba'})}
                            sx={{ mt: 1 }}
                          >
                            Modificar
                          </Button>
                        </Box>
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
                            onChange={(e) => handleFileChange(e, {...prueba, type: 'prueba'})}
                            accept=".pdf"
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

          {tabValue === 4 && ( // Exámenes
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Assessment sx={{ mr: 1, color: 'primary.main' }} /> Exámenes
              </Typography>
              <List disablePadding>
                {actividadesState.examenes.map((examen) => (
                  <Box key={examen.id}>
                    <ListItem sx={{ py: 2, px: 0, display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'error.main' }}>
                        <Grade />
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {examen.tema}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2">
                              Fecha: {examen.fecha}
                            </Typography>
                            {examen.completado && examen.archivo && (
                              <Typography variant="body2" component="span" sx={{ display: 'block', fontStyle: 'italic' }}>
                                Archivo enviado: {examen.archivo}
                              </Typography>
                            )}
                          </>
                        }
                        sx={{ flex: '1 1 auto' }}
                      />
                      {examen.completado ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <StatusChip label="Completado" />
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleModifyFile({...examen, type: 'examen'})}
                            sx={{ mt: 1 }}
                          >
                            Modificar
                          </Button>
                        </Box>
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
                            onChange={(e) => handleFileChange(e, {...examen, type: 'examen'})}
                            accept=".pdf"
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
        </StyledPaper>

        {/* Diálogo para modificar archivo */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Modificar archivo enviado</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              ¿Deseas reemplazar el archivo "{currentActivity?.archivo}"?
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                component="label"
                variant="contained"
                fullWidth
                startIcon={<CloudUpload />}
              >
                Seleccionar nuevo archivo PDF
                <VisuallyHiddenInput 
                  type="file" 
                  onChange={handleConfirmModify}
                  accept=".pdf"
                />
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ActividadesEstudiante;