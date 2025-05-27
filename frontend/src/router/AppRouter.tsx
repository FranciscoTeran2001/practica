import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PaginaInicioAdministrador from "../pages/PaginaInicioAdministrador";
import PaginaInicioProfesor from "../pages/PaginaInicioProfesor";
import PaginaInicioEstudiante from "../pages/PaginaInicioEstudiante";
import RegistrarUsuario from "../pages/RegistrarUsuario";
import ModificarUsuario from "../pages/ModificarUsuario";
import ModificarUsuarioFormulario from "../pages/ModificarUsuarioFormulario";
import RecuperacionContrasena from "../pages/RecuperacionContrasena";
import RestablecerContrasenaFormulario from "../pages/RestablecerContrasenaFormulario";
import MisMateriasEstudiante from "../pages/MisMateriasEstudiante";
import ActividadesEstudiante from "../pages/ActividadesEstudiante";
import MisCursosProfesor from "../pages/MisCursosProfesor";
import PerfilEstudiante from "../pages/PerfilEstudiante";
import PerfilProfesor from "../pages/PerfilProfesor";
import HerramientasProfesor from "../pages/HerramientasProfesor";
import EstudiantePerfilProfesor from "../pages/EstudiantePerfilProfesor";
import CalificacionesParcialesEstudianteProfesor from "../pages/CalificacionesParcialesEstudianteProfesor";
import CalificacionesEstudiante from "../pages/CalificacionesEstudiante";
import AgregarActividad from "../pages/AgregarActividad";
import ListadoEstudiantesCalificarActividad from "../pages/ListadoEstudiantesCalificarActividad";
import CalificarActividadEstudianteProfesor from "../pages/CalificarActividadEstudianteProfesor";
import HerramientasEstudianteAdministrador from "../pages/HerramientasEstudianteAdministrador";
import AsignarCursoAEstudiante from "../pages/AsignarCursoAEstudiante";
import CursosDisponiblesParaEstudiante from "../pages/CursosDisponiblesParaEstudiante";
import ListadoEstudiantesAdministrador from "../pages/ListadoEstudiantesAdministrador";
import ListadoProfesoresAdministrador from "../pages/ListadoProfesoresAdministrador";
import ListadoCalificacionesPorMateriaAdministrador from "../pages/ListadoCalificacionesPorMateriaAdministrador";
import ListadoCalificacionesPromedioEstudiante from "../pages/ListadoCalificacionesPromedioEstudiante";


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={< LoginPage/>} />
            <Route path="/PaginaInicioAdministrador" element={< PaginaInicioAdministrador/>} />
            <Route path="/PaginaInicioProfesor" element={< PaginaInicioProfesor/>} />
            <Route path="/PaginaInicioEstudiante" element={< PaginaInicioEstudiante/>}/>
            <Route path="/RegistrarUsuario" element={< RegistrarUsuario/>}/>
            <Route path="/ModificarUsuario" element={< ModificarUsuario/>}/>
            <Route path="/ModificarUsuarioFormulario" element={< ModificarUsuarioFormulario/>}/>
            <Route path="/recuperacion" element={<RecuperacionContrasena />} />
            <Route path="/formulario_recuperacion" element={<RestablecerContrasenaFormulario />} />
            <Route path="/MisMateriasEstudiante" element={<MisMateriasEstudiante />} />
            <Route path="/ActividadesEstudiante" element={<ActividadesEstudiante />} />
            <Route path="/MisCursosProfesor" element={<MisCursosProfesor />} />
            <Route path="/PerfilEstudiante" element={<PerfilEstudiante />} />
            <Route path="/PerfilProfesor" element={<PerfilProfesor />} />
            <Route path="/HerramientasProfesor" element={<HerramientasProfesor />} />
            <Route path="/EstudiantePerfilProfesor" element={<EstudiantePerfilProfesor />} />
            <Route path="/CalificacionesParcialesEstudianteProfesor" element={<CalificacionesParcialesEstudianteProfesor />} />
            <Route path="/CalificacionesEstudiante" element={<CalificacionesEstudiante />} />
            <Route path="/AgregarActividad" element={<AgregarActividad />} />
            <Route path="/ListadoEstudiantesCalificarActividad" element={<ListadoEstudiantesCalificarActividad />} />
            <Route path="/CalificarActividadEstudianteProfesor" element={<CalificarActividadEstudianteProfesor />} />
            <Route path="/HerramientasEstudianteAdministrador" element={<HerramientasEstudianteAdministrador />} />
            <Route path="/AsignarCursoAEstudiante" element={<AsignarCursoAEstudiante />} />
            <Route path="/CursosDisponiblesParaEstudiante" element={<CursosDisponiblesParaEstudiante />} />
            <Route path="/ListadoEstudiantesAdministrador" element={<ListadoEstudiantesAdministrador />} />
            <Route path="/ListadoProfesoresAdministrador" element={<ListadoProfesoresAdministrador />} />
            <Route path="/ListadoCalificacionesPorMateriaAdministrador" element={<ListadoCalificacionesPorMateriaAdministrador />} />
            <Route path="/ListadoCalificacionesPromedioEstudiante" element={<ListadoCalificacionesPromedioEstudiante />} />
            
        </Routes>
    );
};

