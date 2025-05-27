import { 
  CardContent, 
  CardActionArea, 
  Card, 
  CardMedia, 
  Typography, 
  Grid,
  Container,
  Box,
  keyframes
} from "@mui/material";
import { Navbar3 } from "../components";
import portadaMatematicas from "../assets/portadaMatematicas.jpg";
import portadaCCNN from "../assets/portadaCCNN.jpg";
import portadaSociales from "../assets/portadaSociales.jpg";

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Datos de las materias
const materias = [
  {
    id: 1,
    titulo: "Matemáticas",
    descripcion: "Clases con el Ing. Cerón",
    imagen: portadaMatematicas
  },
  {
    id: 2,
    titulo: "Ciencias Naturales",
    descripcion: "Las de biotecnologia son guapas pero infieles",
    imagen: portadaCCNN
  },
  {
    id: 3,
    titulo: "Estudios Sociales",
    descripcion: "Historia de la salchipapa",
    imagen: portadaSociales
  },
  {
    id: 4,
    titulo: "Matemáticas",
    descripcion: "Clases con el Ing. Cerón",
    imagen: portadaMatematicas
  },
  {
    id: 5,
    titulo: "Ciencias Naturales",
    descripcion: "Las de biotecnologia son guapas pero infieles",
    imagen: portadaCCNN
  },
  {
    id: 6,
    titulo: "Estudios Sociales",
    descripcion: "Historia de la salchipapa",
    imagen: portadaSociales
  }
];

const MisMateriasEstudiante = () => {
  return (
    <>
      <Navbar3 />
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Título con el estilo que te gustó */}
        <Box sx={{
          width: '100%',
          textAlign: 'center',
          mb: 4,
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          color: 'white',
          animation: `${fadeIn} 0.6s ease-out`
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold',
            textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
          }}>
            Mis Materias
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Selecciona una materia para ver más detalles
          </Typography>
        </Box>
        
        <Grid container spacing={3} justifyContent="center">
          {materias.map((materia, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={materia.id}
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              <Card sx={{ 
                width: '300px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  animation: `${pulse} 1.5s infinite`,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }
              }}>
                <CardActionArea sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Contenedor para la imagen con altura fija */}
                  <Box sx={{ 
                    width: '100%',
                    height: '180px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}>
                    <CardMedia
                      component="img"
                      image={materia.imagen}
                      alt={`clase de ${materia.titulo}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        }
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s'
                  }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="div" 
                      sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        textAlign: 'center',
                        fontSize: '1.25rem',
                        transition: 'all 0.3s',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      {materia.titulo}
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
                      {materia.descripcion}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MisMateriasEstudiante;