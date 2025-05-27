import * as React from 'react';
import { Container, Typography, Box, Button } from "@mui/material";
import { DataGrid, type GridColDef,  } from '@mui/x-data-grid';
import { Navbar2 } from "../components/navbar2";

// Datos de ejemplo de estudiantes
const estudiantes = [
  { id: 1, cedula: '001-0101010', nombres: 'Ana María', apellidos: 'García López' },
  { id: 2, cedula: '001-0202020', nombres: 'Luis Fernando', apellidos: 'Martínez Sánchez' },
  { id: 3, cedula: '001-0303030', nombres: 'Carlos Eduardo', apellidos: 'Rodríguez Pérez' },
  { id: 4, cedula: '001-0404040', nombres: 'Sofía Alejandra', apellidos: 'Fernández Gómez' },
  { id: 5, cedula: '001-0505050', nombres: 'Juan Pablo', apellidos: 'Díaz Ramírez' },
  { id: 6, cedula: '001-0606060', nombres: 'María José', apellidos: 'Hernández Castro' },
  { id: 7, cedula: '001-0707070', nombres: 'Pedro Antonio', apellidos: 'López Mendoza' },
  { id: 8, cedula: '001-0808080', nombres: 'Laura Beatriz', apellidos: 'Gómez Vargas' },
  { id: 9, cedula: '001-0909090', nombres: 'Diego Alejandro', apellidos: 'Silva Rojas' },
  { id: 10, cedula: '001-1010101', nombres: 'Camila Valentina', apellidos: 'Torres Jiménez' }
];

// Columnas de la tabla
const columns: GridColDef[] = [
  { 
    field: 'cedula', 
    headerName: 'Cédula', 
    width: 150,
    editable: false 
  },
  { 
    field: 'nombres', 
    headerName: 'Nombres', 
    width: 200,
    editable: false
  },
  { 
    field: 'apellidos', 
    headerName: 'Apellidos', 
    width: 200,
    editable: false 
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          // Aquí puedes agregar la lógica para calificar
          console.log(`Calificar estudiante con ID: ${params.row.id}`);
        }}
        sx={{ textTransform: 'none' }}
      >
        Calificar
      </Button>
    ),
  },
];

export const ListadoEstudiantesCalificarActividad = () => {
    return (
        <>
        <Navbar2/>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
            Elija un estudiante
          </Typography>
          
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={estudiantes}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
              disableColumnMenu
            />
          </Box>
        </Container>
        </>
    );
};

export default ListadoEstudiantesCalificarActividad;