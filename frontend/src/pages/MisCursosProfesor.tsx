import { 
  CardContent, 
  CardActionArea, 
  Card, 
  CardMedia, 
  Typography, 
  Grid,
  Container,
  Box,
  Button,
  useTheme
} from "@mui/material";
import { Navbar2 } from "../components/navbar2";
import fondoAzul from "../assets/fondoAzul.jpeg";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Datos de las materias
const materias = [
  {
    id: 1,
    titulo: "2do A",
    descripcion: "Clases con el Ing. Cueva",
    imagen: fondoAzul,
    color: "#4e79a7"
  },
  {
    id: 2,
    titulo: "2do B",
    descripcion: "Clases con el Ing. Nando",
    imagen: fondoAzul,
    color: "#f28e2b"
  },
  {
    id: 3,
    titulo: "3ro A",
    descripcion: "Clases con el Ing. Luis",
    imagen: fondoAzul,
    color: "#e15759"
  },
  {
    id: 4,
    titulo: "3ro B",
    descripcion: "Clases con el Ing. Flores",
    imagen: fondoAzul,
    color: "#76b7b2"
  },
  {
    id: 5,
    titulo: "4to A",
    descripcion: "Clases con el Ing. Francisco",
    imagen: fondoAzul,
    color: "#59a14f"
  },
  {
    id: 6,
    titulo: "4to B",
    descripcion: "Clases con el Ing. Xavier",
    imagen: fondoAzul,
    color: "#edc948"
  },
  {
    id: 7,
    titulo: "5to A",
    descripcion: "Clases con el Ing. Teran",
    imagen: fondoAzul,
    color: "#b07aa1"
  },
  {
    id: 8,
    titulo: "5to B",
    descripcion: "Clases con el Ing. Francisco",
    imagen: fondoAzul,
    color: "#ff9da7"
  },
  {
    id: 9,
    titulo: "6to A",
    descripcion: "Clases con el Ing. Francisco",
    imagen: fondoAzul,
    color: "#9c755f"
  },
];

export const MisCursosProfesor = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Navbar2/>
      <Container maxWidth="lg" sx={{ 
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #f5f7fa 0%, #e4e8ed 100%)',
        minHeight: '100vh'
      }}>
        {/* Encabezado con efecto */}
        <Box sx={{
          width: '100%',
          textAlign: 'center',
          mb: 4,
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          color: 'white'
        }}>
          <Typography variant="h3" gutterBottom sx={{ 
            fontWeight: 'bold',
            textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
          }}>
            Mis Cursos
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Selecciona un curso para ver más detalles
          </Typography>
        </Box>
        
        {/* Grid de cursos */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
          {materias.map((materia) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={materia.id}>
              <Card sx={{ 
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: theme.shadows[3],
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[8]
                }
              }}>
                <CardActionArea 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}
                  onClick={() => console.log(`Curso seleccionado: ${materia.titulo}`)}
                >
                  {/* Barra de color superior */}
                  <Box sx={{ 
                    width: '100%',
                    height: '6px',
                    background: materia.color
                  }} />
                  
                  {/* Contenedor para la imagen */}
                  <Box sx={{ 
                    width: '100%',
                    height: '140px',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '40%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)'
                    }
                  }}>
                    <CardMedia
                      component="img"
                      image={materia.imagen}
                      alt={`clase de ${materia.titulo}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 2.5
                  }}>
                    <Box>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="div"
                        sx={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: '1.3rem',
                          mb: 1.5,
                          color: theme.palette.text.primary
                        }}
                      >
                        {materia.titulo}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          textAlign: 'center',
                          fontSize: '0.95rem',
                          lineHeight: 1.4,
                          mb: 1
                        }}
                      >
                        {materia.descripcion}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      mt: 1.5,
                      textAlign: 'center'
                    }}>
                      <Button 
                        variant="contained" 
                        size="small"
                        sx={{
                          backgroundColor: materia.color,
                          '&:hover': {
                            backgroundColor: materia.color,
                            opacity: 0.9
                          }
                        }}
                      >
                        Ver Curso
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Botón de regresar */}
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          mb: 4
        }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: '50px',
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
                backgroundColor: theme.palette.action.hover
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

export default MisCursosProfesor;