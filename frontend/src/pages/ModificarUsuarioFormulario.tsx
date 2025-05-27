import { Container, Typography, Box, TextField, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Stack, Button, Radio } from "@mui/material";
import { Navbar1 } from "../components/navbar1";
import React from "react";
import EmailIcon from '@mui/icons-material/Email';
import { Visibility, VisibilityOff } from "@mui/icons-material";
export const ModificarUsuarioFormulario = () => {

    const [nombres, setNombres] = React.useState('');
        const [apellidos, setApellidos] = React.useState('');
        const [cedula, setCedula] = React.useState('');
        const [correo, setCorreo] = React.useState('');
        const [correoError, setCorreoError] = React.useState(false);
    
        const handleCedulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if (/^\d{0,10}$/.test(value)) {
              setCedula(value);
            }
          };
    
        const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setCorreo(value);
            
            // Regex básico para validar correos como nombre@dominio.com o nombre@espe.edu.ec
            const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ec|edu\.ec)$/;
            
            setCorreoError(!correoRegex.test(value));
        };
        const [showPassword, setShowPassword] = React.useState(false);
    
        const handleClickShowPassword = () => setShowPassword((show) => !show);
    
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };
    
        const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };
    
        const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value.toUpperCase();
            if (/^[A-Z\s]*$/.test(value)) {
            setNombres(value);
            }
        };
      
        const handleApellidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value.toUpperCase();
            if (/^[A-Z\s]*$/.test(value)) {
            setApellidos(value);
            }
        };
    return (
        <>
        <Navbar1/>

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            
        <Typography variant="h3" component="h1" gutterBottom>
            Modificar Usuario
        </Typography>   
        <div>
            
            <TextField
            label="Nombres"
            id="nombres"
            sx={{ m: 1, width: '25ch' }}
            value={nombres}
            onChange={handleNombreChange}
            />

            <TextField
            label="Apellidos"
            id="apellidos"
            sx={{ m: 1, width: '25ch' }}
            value={apellidos}
            onChange={handleApellidoChange}
            />

            <TextField
            label="Cédula"
            id="cedula"
            sx={{ m: 1, width: '25ch' }}
            value={cedula}
            onChange={handleCedulaChange}
            />

            <TextField
            label="Nombre de Usuario"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            />  

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Contraseña"
            />
            </FormControl>
            
            <FormControl fullWidth sx={{ m: 1 }} error={correoError}>
            <InputLabel htmlFor="outlined-adornment-email">Correo</InputLabel>
            <OutlinedInput
                id="outlined-adornment-email"
                value={correo}
                onChange={handleCorreoChange}
                startAdornment={
                <InputAdornment position="start">
                    <EmailIcon />
                </InputAdornment>
                }
                label="Correo"
            />
            {correoError && (
                <FormHelperText>Formato de correo inválido</FormHelperText>
            )}
            </FormControl>

            
        </div>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Tipo de usuario</FormLabel>
            <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            row
            >
            <FormControlLabel value="female" control={<Radio />} label="Administrador" />
            <FormControlLabel value="male" control={<Radio />} label="Profesor" />
            <FormControlLabel value="other" control={<Radio />} label="Estudiante" />
            </RadioGroup>
        </FormControl>
        </Box>
        </Box>

        <Stack spacing={2} direction="row" sx={{justifyContent: 'center' , m: 5}}>
    
        <Button variant="contained">Modificar</Button>
        </Stack>
        </>
    );
};
export default ModificarUsuarioFormulario