import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from "@mui/material";
import { Navbar1 } from "../components/navbar1";

// Datos de cursos
const cursos = [
  {
    id: 1,
    nombre: "Matemáticas Básicas",
    descripcion: "Álgebra, aritmética y geometría elemental",
    imagen: "/static/math.jpg"
  },
  {
    id: 2,
    nombre: "Literatura Universal",
    descripcion: "Obras clásicas de la literatura mundial",
    imagen: "/static/literature.jpg" 
  },
  {
    id: 3,
    nombre: "Biología Celular",
    descripcion: "Estructura y función de las célulassaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    imagen: "/static/biology.jpg"
  },
  {
    id: 4, 
    nombre: "Programación I",
    descripcion: "Introducción a Python y algoritmos",
    imagen: "/static/programming.jpg"
  },
  {
    id: 5,
    nombre: "Historia Contemporánea",
    descripcion: "Siglo XX hasta la actualidad",
    imagen: "/static/history.jpg"
  },
  {
    id: 6,
    nombre: "Arte Digital",
    descripcion: "Diseño gráfico con herramientas modernas",
    imagen: "/static/art.jpg"
  }
];

export const CursosDisponiblesParaEstudiante = () => {
  return (
    <>
      <Navbar1 />
      <Container maxWidth="lg" sx={{ 
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h4" gutterBottom sx={{ 
          mb: 4,
          fontWeight: 'bold',
          color: 'primary.main',
          textAlign: 'center'
        }}>
          Cursos Disponibles
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {cursos.map((curso) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={curso.id}>
              <Card sx={{ 
                width: '280px', // Ancho fijo
                height: '320px', // Alto fijo
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}>
                {/* Contenedor para la imagen con altura fija */}
                <Box sx={{ 
                  width: '100%',
                  height: '140px',
                  overflow: 'hidden'
                }}>
                  <CardMedia
                    component="img"
                    image={curso.imagen}
                    alt={curso.nombre}
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
                  justifyContent: 'center'
                }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '1.25rem',
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {curso.nombre}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {curso.descripcion}
                  </Typography>
                </CardContent>
                
                {/* Botón centrado en la parte inferior */}
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  pb: 2,
                  pt: 1
                }}>
                  <Button 
                    variant="contained"
                    size="medium"
                    sx={{ 
                      width: '80%',
                      textTransform: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Asignar Curso
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CursosDisponiblesParaEstudiante;