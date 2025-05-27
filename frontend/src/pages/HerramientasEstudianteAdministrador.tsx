import { 
  Container, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  Grid,
  Avatar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { 
  School, 
  Assignment, 
  Assessment, 
  Group
} from '@mui/icons-material';
import { Navbar1 } from "../components/navbar1";
import React from "react";
import { useNavigate } from "react-router-dom";


// Configuración de las rutas para cada opción del menú
const menuOptions = {
  'Asignar Curso': {
    icon: <School fontSize="small" />,
    path: '/AsignarCursoAEstudiante'
  },
  'Calificaciones por Materia': {
    icon: <Assignment fontSize="small" />,
    path: '/ListadoCalificacionesPorMateriaAdministrador'
  },
  'Calificaciones Promedio Estudiante': {
    icon: <Assessment fontSize="small" />,
    path: '/ListadoCalificacionesPromedioEstudiante'
  },
  'Listado de Estudiantes': {
    icon: <Group fontSize="small" />,
    path: '/ListadoEstudiantesAdministrador'
  }
};

export const HerramientasEstudianteAdministrador = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('Asignar Curso'); // Cambiado a primera opción

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (item) => {
    setSelectedItem(item);
    navigate(menuOptions[item].path);
  };

  const menuItems = Object.keys(menuOptions);

  const drawer = (
    <Box 
      onClick={handleDrawerToggle}
      sx={{
        height: '100%',
        background: 'linear-gradient(to bottom, #f5f7fa 0%, #e3e9f2 100%)'
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar sx={{ 
          width: 56, 
          height: 56, 
          bgcolor: theme.palette.primary.main,
          mb: 1,
          mx: 'auto'
        }}>
          <School />
        </Avatar>
        <Typography variant="h6" color="primary">
          Herramientas
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item} 
            disablePadding
            sx={{
              backgroundColor: selectedItem === item ? theme.palette.action.selected : 'inherit'
            }}
          >
            <ListItemButton onClick={() => handleNavigation(item)}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: selectedItem === item ? theme.palette.primary.main : 'inherit'
              }}>
                <Box sx={{ mr: 1 }}>
                  {React.cloneElement(menuOptions[item].icon, {
                    color: selectedItem === item ? 'primary' : 'action'
                  })}
                </Box>
                <ListItemText 
                  primary={item} 
                  primaryTypographyProps={{
                    fontWeight: selectedItem === item ? 'medium' : 'normal'
                  }}
                />
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderContent = () => {
    switch(selectedItem) {
      case 'Asignar Curso':
        return (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Asignación de Cursos
            </Typography>
            <Typography>
              Aquí puedes asignar o cambiar cursos a los estudiantes.
            </Typography>
          </Paper>
        );
      case 'Calificaciones por Materia':
        return (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Calificaciones por Materia
            </Typography>
            <Typography>
              Visualiza y gestiona las calificaciones individuales por materia.
            </Typography>
          </Paper>
        );
      case 'Promedio de Calificaciones':
        return (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Promedios Académicos
            </Typography>
            <Typography>
              Consulta los promedios generales de los estudiantes.
            </Typography>
          </Paper>
        );
      case 'Listado de Estudiantes':
        return (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Listado Completo
            </Typography>
            <Typography>
              Accede al listado completo de estudiantes matriculados.
            </Typography>
          </Paper>
        );
      default:
        return (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Bienvenido al Sistema Estudiantil
            </Typography>
            <Typography>
              Seleccione una opción del menú para comenzar.
            </Typography>
          </Paper>
        );
    }
  };

  return (
    <>
      <Navbar1 />
      
      {/* AppBar secundario mejorado */}
      <AppBar 
        position="sticky"
        color="default"
        sx={{ 
          top: 64, // Altura del Navbar1
          bgcolor: 'background.paper',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          zIndex: theme.zIndex.appBar - 1
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: '56px !important' }}>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  ml: 1,
                  fontWeight: 'medium',
                  color: theme.palette.primary.main
                }}
              >
                {selectedItem}
              </Typography>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {menuItems.map((item) => (
                <Button 
                  key={item} 
                  variant={selectedItem === item ? "contained" : "text"}
                  size="small"
                  startIcon={menuOptions[item].icon}
                  onClick={() => handleNavigation(item)}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                    borderRadius: '8px',
                    px: 2,
                    '&.MuiButton-contained': {
                      boxShadow: 'none'
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer para móviles */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: 240,
            top: 120 // Altura de ambos navbars
          },
        }}
      >
        {drawer}
      </Drawer>

      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
        {renderContent()}
      </Container>
    </>
  );
};

export default HerramientasEstudianteAdministrador;