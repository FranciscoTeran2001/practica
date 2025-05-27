import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  TextField,
  Button,
  Divider,
  Alert
} from "@mui/material";
import { Navbar2 } from "../components/navbar2";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Save } from '@mui/icons-material';

export const CalificarActividadEstudianteProfesor = () => {
  const { actividadId, estudianteId } = useParams();
  const navigate = useNavigate();
  
  // Estado para el formulario
  const [nota, setNota] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Datos de ejemplo (en una aplicación real, estos vendrían de una API)
  const actividad = {
    id: actividadId || '1',
    titulo: "Tarea 1: Ejercicios de álgebra",
    descripcion: "Resolver los problemas de la página 45 del libro de texto",
    fechaEntrega: "2023-11-15",
    puntosMaximos: 10
  };

  const estudiante = {
    id: estudianteId || '101',
    nombres: "María",
    apellidos: "González",
    cedula: "001-0202020"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación
    if (!nota) {
      setError('Por favor ingrese la nota');
      return;
    }
    
    const notaNum = parseFloat(nota);
    if (isNaN(notaNum)) {
      setError('La nota debe ser un número');
      return;
    }
    
    if (notaNum < 0 || notaNum > 10) {
      setError('La nota debe estar entre 0 y 10');
      return;
    }
    
    // Aquí iría la lógica para guardar en la API
    console.log('Calificación guardada:', {
      actividadId,
      estudianteId,
      nota: notaNum,
      comentarios
    });
    
    setError('');
    setSuccess('Calificación guardada correctamente');
    
    // Opcional: redirigir después de guardar
    setTimeout(() => navigate(-1), 2000);
  };

  return (
    <>
      <Navbar2 />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
        
        <Paper elevation={3} sx={{ p: 3 }}>
          {/* Información de la actividad */}
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {actividad.titulo}
          </Typography>
          
          <Typography variant="body1" paragraph>
            {actividad.descripcion}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Fecha de entrega: {actividad.fechaEntrega} | Puntos máximos: {actividad.puntosMaximos}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Información del estudiante */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Estudiante a calificar:
          </Typography>
          <Typography variant="body1">
            {estudiante.nombres} {estudiante.apellidos} - {estudiante.cedula}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Formulario de calificación */}
          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            
            <TextField
              label="Nota (0-10)"
              variant="outlined"
              fullWidth
              type="number"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              inputProps={{ 
                min: 0,
                max: 10,
                step: 0.1
              }}
              sx={{ mb: 2 }}
              required
              error={Boolean(error)}
              helperText={error || "Ingrese la calificación sobre 10"}
            />
            
            <TextField
              label="Comentarios (opcional)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Save />}
                sx={{ textTransform: 'none' }}
              >
                Guardar Calificación
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default CalificarActividadEstudianteProfesor;