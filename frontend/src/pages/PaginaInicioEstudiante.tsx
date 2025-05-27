import { Container, Typography, Box } from "@mui/material";
import { Navbar3 } from "../components/navbar3";

export const paginaInicioEstudiante = () => {
    return (
        <>
            <Navbar3 />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Bienvenido Estudiante
                    </Typography>
                    <Typography variant="body1">
                        Esta es tu página de inicio donde podrás acceder a todas las funcionalidades disponibles.
                    </Typography>
                </Box>
                
                {/* Aquí puedes agregar más componentes para el dashboard del estudiante */}
            </Container>
        </>
    );
};
export default paginaInicioEstudiante