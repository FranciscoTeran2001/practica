import { Avatar, Paper, Container, Typography, Box, TextField, Button, Alert, OutlinedInput, InputAdornment, IconButton, InputLabel, FormControl } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RestablecerContrasenaFormulario = () => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        // Validación final antes de continuar
        const error = validatePassword(password);
        setPasswordError(error);

        if (error) {
            setSuccess(false);
            return;
        }

        // Si todo está bien, simular éxito
        setSuccess(true);
        // Puedes limpiar el campo si quieres
        setPassword('');
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

export default RestablecerContrasenaFormulario;