import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableContainer,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Tooltip,
  Avatar,
  Select,
  MenuItem,
  InputAdornment,
  Slide,
  Fade,
  Divider,
  Chip,
  Collapse,
  FormControl,
  InputLabel
} from "@mui/material";
import { 
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  VerifiedUser as VerifiedUserIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { Navbar1 } from "../components";
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Custom transition for dialogs
const Transition = React.forwardRef(function Transition(
  props, 
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Custom theme
const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5', light: '#757de8', dark: '#002984', contrastText: '#fff' },
    secondary: { main: '#f50057', light: '#ff4081', dark: '#c51162', contrastText: '#fff' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600, letterSpacing: '0.5px' },
  },
});

// Data
const cursosDisponibles = ['1ro A', '1ro B', '2do A', '2do B', '3ro A', '3ro B', '3ro C', '4to', '5to', '6to'];
const periodosAcademicos = [
  'Diciembre 2024 - Enero 2025',
  'Febrero 2025 - Abril 2025',
  'Mayo 2025 - Julio 2025',
  'Agosto 2025 - Octubre 2025',
  'Noviembre 2025 - Enero 2026'
];

const ModificarUsuario = () => {
  // Sample data
  const initialUsers = [
    { 
      id: 1, 
      cedula: '001-0102030', 
      nombres: 'Ana María', 
      apellidos: 'García López', 
      nombreUsuario: 'anagarcia',
      tipoUsuario: 'Estudiante',
      email: 'ana.garcia@example.com',
      avatarColor: '#f44336',
      curso: '3ro A',
      periodoAcademico: 'Diciembre 2024 - Enero 2025',
      password: ''
    },
    { 
      id: 2, 
      cedula: '001-0405060', 
      nombres: 'Luis Carlos', 
      apellidos: 'Martínez Fernández', 
      nombreUsuario: 'luismartinez',
      tipoUsuario: 'Profesor',
      email: 'luis.martinez@example.com',
      avatarColor: '#2196f3',
      curso: '4to',
      password: ''
    },
    { 
      id: 3, 
      cedula: '001-0708090', 
      nombres: 'Marta Elena', 
      apellidos: 'Sánchez Ruiz', 
      nombreUsuario: 'martasanchez',
      tipoUsuario: 'Administrador',
      email: 'marta.sanchez@example.com',
      avatarColor: '#4caf50',
      password: ''
    },
  ];

  // State
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cedula.includes(searchTerm);
    
    const matchesFilter = filter === 'Todos' || user.tipoUsuario === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Handlers
  const handleOpenEdit = (user) => {
    setSelectedUser({...user});
    setShowPasswordForm(false);
    setConfirmPassword('');
    setOpen(true);
  };

  const handleOpenDelete = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteDialogOpen(false);
  };

  const handleSave = () => {
    if (showPasswordForm && selectedUser.password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (selectedUser.id) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? selectedUser : user
      ));
    } else {
      const newUser = {
        ...selectedUser,
        id: Math.max(...users.map(u => u.id), 0) + 1,
        avatarColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
      };
      setUsers([...users, newUser]);
    }
    handleClose();
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== userToDelete.id));
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNewUser = () => {
    const newUser = {
      id: null,
      cedula: '',
      nombres: '',
      apellidos: '',
      nombreUsuario: '',
      tipoUsuario: 'Estudiante',
      email: '',
      password: '',
      curso: '1ro A',
      periodoAcademico: periodosAcademicos[0]
    };
    setSelectedUser(newUser);
    setShowPasswordForm(true);
    setOpen(true);
  };

  const getUserIcon = (type) => {
    switch(type) {
      case 'Administrador': return <VerifiedUserIcon />;
      case 'Profesor': return <SchoolIcon />;
      default: return <PersonIcon />;
    }
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    if (!showPasswordForm) {
      setSelectedUser(prev => ({ ...prev, password: '' }));
      setConfirmPassword('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar1 />
      <Container maxWidth="xl" sx={{ 
        mt: 4, 
        mb: 4,
        animation: 'fadeIn 0.5s ease-in',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            Gestión de Usuarios
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleAddNewUser}
            sx={{
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Nuevo Usuario
          </Button>
        </Box>

        {/* Search and filter */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Buscar usuarios..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flex: 2,
                '& .MuiOutlinedInput-root': { borderRadius: 2 }
              }}
            />
            
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ minWidth: 150, borderRadius: 2, flex: 1 }}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="Estudiante">Estudiantes</MenuItem>
              <MenuItem value="Profesor">Profesores</MenuItem>
              <MenuItem value="Administrador">Administradores</MenuItem>
            </Select>
          </Box>
        </Paper>

        {/* Users table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <Table sx={{ minWidth: 850 }} aria-label="tabla de usuarios">
            <TableHead>
              <TableRow sx={{ 
                bgcolor: 'primary.main',
                '& th': { color: 'white', fontWeight: 'bold', fontSize: '0.95rem', py: 2 }
              }}>
                <TableCell>Usuario</TableCell>
                <TableCell>Cédula</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} hover sx={{
                    '&:nth-of-type(even)': { backgroundColor: 'action.hover' },
                    '&:last-child td': { borderBottom: 0 }
                  }}>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        @{user.nombreUsuario}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.cedula}</TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>{user.nombres}</TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>{user.apellidos}</TableCell>
                    <TableCell>
                      <Chip
                        icon={getUserIcon(user.tipoUsuario)}
                        label={user.tipoUsuario}
                        color={user.tipoUsuario === 'Administrador' ? 'primary' : user.tipoUsuario === 'Profesor' ? 'secondary' : 'default'}
                        size="small"
                        sx={{ borderRadius: 1, fontWeight: 'medium' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Tooltip title="Editar" arrow>
                          <IconButton 
                            color="primary"
                            onClick={() => handleOpenEdit(user)}
                            aria-label="editar"
                            sx={{ 
                              mr: 1,
                              '&:hover': { backgroundColor: 'primary.light', color: 'white' }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar" arrow>
                          <IconButton 
                            color="error"
                            onClick={() => handleOpenDelete(user)}
                            aria-label="eliminar"
                            sx={{ 
                              '&:hover': { backgroundColor: 'error.light', color: 'white' }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron usuarios
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit/Create User Dialog */}
        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold', py: 2 }}>
            {selectedUser?.id ? 'Editar Usuario' : 'Nuevo Usuario'}
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            {selectedUser && (
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                {selectedUser.id ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: selectedUser.avatarColor, width: 56, height: 56, mr: 2 }}>
                      {selectedUser.nombres?.charAt(0) || ''}{selectedUser.apellidos?.charAt(0) || ''}
                    </Avatar>
                    <Typography variant="h6">
                      {selectedUser.nombres} {selectedUser.apellidos}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {selectedUser.id ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                  </Typography>
                )}
                
                <Divider />
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    name="nombres"
                    label="Nombres"
                    value={selectedUser.nombres}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                    required
                  />
                  <TextField
                    name="apellidos"
                    label="Apellidos"
                    value={selectedUser.apellidos}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                    required
                  />
                </Box>
                
                <TextField
                  name="cedula"
                  label="Cédula"
                  value={selectedUser.cedula}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  required
                />
                
                <TextField
                  name="nombreUsuario"
                  label="Nombre de Usuario"
                  value={selectedUser.nombreUsuario}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  required
                />
                
                <TextField
                  name="email"
                  label="Correo Electrónico"
                  value={selectedUser.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  required
                  type="email"
                />
                
                <FormControl fullWidth size="small">
                  <InputLabel>Tipo de Usuario</InputLabel>
                  <Select
                    name="tipoUsuario"
                    value={selectedUser.tipoUsuario}
                    onChange={handleChange}
                    variant="outlined"
                    label="Tipo de Usuario"
                    required
                  >
                    <MenuItem value="Estudiante">Estudiante</MenuItem>
                    <MenuItem value="Profesor">Profesor</MenuItem>
                    <MenuItem value="Administrador">Administrador</MenuItem>
                  </Select>
                </FormControl>

                {/* Password section - always visible for new users */}
                <Box>
                  {selectedUser.id ? (
                    <Button
                      startIcon={<LockIcon />}
                      endIcon={showPasswordForm ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      onClick={togglePasswordForm}
                      sx={{ mb: 1 }}
                    >
                      Cambiar contraseña
                    </Button>
                  ) : (
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Contraseña
                    </Typography>
                  )}
                  
                  <Collapse in={showPasswordForm || !selectedUser.id}>
                    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, backgroundColor: 'background.paper' }}>
                      <TextField
                        name="password"
                        label={selectedUser.id ? "Nueva Contraseña" : "Contraseña"}
                        type="password"
                        value={selectedUser.password}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                        required={!selectedUser.id}
                      />
                      <TextField
                        name="confirmPassword"
                        label={selectedUser.id ? "Confirmar Nueva Contraseña" : "Confirmar Contraseña"}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        required={!selectedUser.id}
                      />
                    </Box>
                  </Collapse>
                </Box>

                {/* Specific fields for Professors */}
                {selectedUser.tipoUsuario === 'Profesor' && (
                  <FormControl fullWidth size="small">
                    <InputLabel>Curso Asignado</InputLabel>
                    <Select
                      name="curso"
                      value={selectedUser.curso || ''}
                      onChange={handleChange}
                      label="Curso Asignado"
                    >
                      {cursosDisponibles.map(curso => (
                        <MenuItem key={curso} value={curso}>{curso}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {/* Specific fields for Students */}
                {selectedUser.tipoUsuario === 'Estudiante' && (
                  <>
                    <FormControl fullWidth size="small">
                      <InputLabel>Curso</InputLabel>
                      <Select
                        name="curso"
                        value={selectedUser.curso || ''}
                        onChange={handleChange}
                        label="Curso"
                      >
                        {cursosDisponibles.map(curso => (
                          <MenuItem key={curso} value={curso}>{curso}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel>Periodo Académico</InputLabel>
                      <Select
                        name="periodoAcademico"
                        value={selectedUser.periodoAcademico || ''}
                        onChange={handleChange}
                        label="Periodo Académico"
                      >
                        {periodosAcademicos.map(periodo => (
                          <MenuItem key={periodo} value={periodo}>{periodo}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, px: 3 }}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              color="primary" 
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 3,
                boxShadow: 'none',
                '&:hover': { boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }
              }}
            >
              {selectedUser?.id ? 'Guardar Cambios' : 'Crear Usuario'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleClose} TransitionComponent={Transition} maxWidth="xs">
          <DialogTitle sx={{ bgcolor: 'error.main', color: 'white', fontWeight: 'bold', py: 2 }}>
            Confirmar Eliminación
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'error.light', width: 64, height: 64, mb: 2 }}>
                <DeleteIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" gutterBottom>
                ¿Estás seguro?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Esta acción eliminará permanentemente al usuario:<br />
                <strong>{userToDelete?.nombres} {userToDelete?.apellidos}</strong>
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, px: 3 }}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmDelete} 
              color="error" 
              variant="contained"
              startIcon={<DeleteIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                boxShadow: 'none',
                '&:hover': { bgcolor: 'error.dark', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }
              }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        <Fade in={true}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />}
            sx={{ 
              mt: 3,
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 'medium',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'translateX(-4px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Volver al panel principal
          </Button>
        </Fade>
      </Container>
    </ThemeProvider>
  );
};

export default ModificarUsuario;