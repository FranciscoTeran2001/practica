import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import React from "react";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
type Props = {
    window?: () => Window;
};

const drawerWidth = 240;
const navItems = [
    { text: 'Pagina Principal', path: '/PaginaInicioEstudiante' },
    { text: 'Perfil', path: '/PerfilEstudiante' },
    { text: 'Mis Materias', path: '/MisMateriasEstudiante' },
    { text: 'Cerrar Sesion', action: 'logout' }
];

export const Navbar3 = (props: Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { logout } = useAuth();
    const handleDrawerToogle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToogle} sx={{ textAlign: 'center' }}>
            {/* Logo para la versión móvil (drawer) */}
            <Box
                component="img"
                src={logo}
                alt="Logo Liceo La Siembra"
                sx={{
                    height: 60,
                    width: 'auto',
                    my: 2,
                    mx: 'auto'
                }}
            />
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={item.action ? 'button' : Link}
                            to={item.path}
                            sx={{ textAlign: 'center' }}
                            onClick={item.action === 'logout' ? logout : undefined}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component='nav' sx={{ bgcolor: '#549b4e' }}>
                <Toolbar>
                    <IconButton sx={{ mr: 2, display: { sm: 'none' } }} color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToogle}>
                        <MenuIcon></MenuIcon>
                    </IconButton>

                    {/* Logo para la versión de escritorio */}
                    <Box
                        component="img"
                        src={logo}
                        alt="Logo Liceo La Siembra"
                        sx={{
                            height: 50,
                            width: 'auto',
                            marginRight: 'auto',
                            display: { xs: 'none', sm: 'block' }
                        }}
                    />

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.text}
                                sx={{ color: '#fff' }}
                                component={item.action ? 'button' : Link}
                                to={item.path}
                                onClick={item.action === 'logout' ? logout : undefined}
                            >
                                {item.text}
                            </Button>
                        ))}

                    </Box>
                </Toolbar>
            </AppBar>

            <nav>
                <Drawer container={container} variant='temporary' open={mobileOpen} onClose={handleDrawerToogle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        },
                    }}>
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    )
};