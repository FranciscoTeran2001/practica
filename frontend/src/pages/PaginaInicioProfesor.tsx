import { Container, Typography, Box } from "@mui/material";
import { Navbar2 } from "../components/navbar2";

export const PaginaInicioProfesor = () => {
    return (
        <>
            <Navbar2 />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Bienvenido Profesor
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
export default PaginaInicioProfesor