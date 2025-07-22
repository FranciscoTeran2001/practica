import { Avatar, Paper, Container, Typography, Box, TextField, Button, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";

const RecuperacionContrasena = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorCedula, setErrorCedula] = useState('');
    const [success, setSuccess] = useState(false);
    const [cedula, setCedula] = useState('');

    const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) { // Solo permite dígitos
            setErrorCedula('Solo números permitidos');
        } else if (value.length > 10) {
            setErrorCedula('Máximo 10 dígitos');
        } else {
            setErrorCedula('');
        }
        setCedula(value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones previas
    if (!cedula) {
        setErrorCedula('Ingrese la cédula');
        return;
    } else if (!/^\d{10}$/.test(cedula)) {
        setErrorCedula('Debe tener 10 dígitos exactos');
        return;
    }
    if (!email) {
        setErrorEmail('Por favor ingresa tu correo electrónico');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorEmail('Ingresa un correo electrónico válido');
        return;
    }

    setErrorEmail('');
    setErrorCedula('');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/solicitar-recuperacion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUsuario: cedula,  
                email: email
            })
        });

        if (!response.ok) {
            // Capturar error y mostrar mensaje
            const data = await response.json();
            setSuccess(false);
            setErrorEmail(data.message || 'Error al enviar la solicitud');
            return;
        }

        // Si todo fue bien
        setSuccess(true);
    } catch (error) {
        setSuccess(false);
        setErrorEmail('Error al conectar con el servidor');
    }
};



    return (
        <Container maxWidth="xs" sx={{ py: 4 }}>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2
                }}
            >
                {/* Encabezado */}
                <Avatar
                    sx={{
                        bgcolor: 'secondary.main',
                        mb: 3,
                        width: 64,
                        height: 64
                    }}
                >
                    <LockOutlinedIcon fontSize="medium" />
                </Avatar>

                <Typography
                    component="h1"
                    variant="h5"
                    sx={{
                        mb: 4,
                        fontWeight: 'bold'
                    }}
                >
                    Recuperación de contraseña
                </Typography>

                {/* Formulario */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                    }}
                >
                    <TextField
                        fullWidth
                        required
                        label="Cédula"
                        value={cedula}
                        onChange={handleCedulaChange} // Función con validación
                        error={!!errorCedula}
                        helperText={errorCedula}

                    />
                    <TextField

                        fullWidth
                        required
                        label="Correo electrónico"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errorEmail}
                        helperText={errorEmail}
                        type="email"

                    />
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            ¡Hemos enviado un enlace de recuperación a tu correo!
                        </Alert>
                    )}

                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'space-between',
                        pt: 1
                    }}>
                        <Button
                            component={Link}
                            to="/login"
                            variant="outlined"
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                py: 1.5
                            }}
                        >
                            Regresar
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                py: 1.5
                            }}
                        >
                            Enviar instrucciones
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default RecuperacionContrasena;