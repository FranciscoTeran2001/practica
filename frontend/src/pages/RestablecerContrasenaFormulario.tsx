import { Avatar, Paper, Container, Typography, Box, TextField, Button, Alert, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";

const RestablecerContrasenaFormulario = () => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // Obtener token del query string
    const query = new URLSearchParams(location.search);
    const token = query.get("token") || "";

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const validatePassword = (value: string) => {


        const errors = [];

        if (value.length < 8) {
            errors.push('Mínimo 8 caracteres');
        }
        if (!/[A-Z]/.test(value)) {
            errors.push('Al menos 1 mayúscula');
        }
        if (!/[a-z]/.test(value)) {
            errors.push('Al menos 1 minúscula');
        }
        if (!/[0-9]/.test(value)) {
            errors.push('Al menos 1 número');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            errors.push('Al menos 1 carácter especial');
        }

        return errors.length > 0 ? errors.join(', ') : '';
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const error = validatePassword(password);
        setPasswordError(error);

        if (error) {
            setSuccess(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/restablecer-contrasena`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tokenRecuperacion: token, nuevaContrasena: password }),
            });


            if (!response.ok) {
                const data = await response.json();
                setPasswordError(data.message || 'Error al restablecer contraseña');
                setSuccess(false);
                return;
            }

            setSuccess(true);
            setPassword('');
            setPasswordError('');
            setTimeout(() => {
                navigate('/login');
            }, 2000);


            setSuccess(true);
            setPassword('');
        } catch (err) {
            setPasswordError('Error de conexión con el servidor');
            setSuccess(false);
        }
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value));
    }

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
                        value={password}
                        onChange={handlePasswordChange}
                        error={!!passwordError}
                        helperText={passwordError || 'Requisitos: 8+ caracteres, mayúscula, minúscula, número y símbolo'}
                        type={showPassword ? 'text' : 'password'}
                        label="Contraseña"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />



                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Se ha restablecido la contraseña correctamente. Puedes iniciar sesión con tu nueva contraseña.
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

export default RestablecerContrasenaFormulario;