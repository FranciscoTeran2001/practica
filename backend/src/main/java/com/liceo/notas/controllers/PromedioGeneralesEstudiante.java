package com.liceo.notas.controllers;

import com.liceo.notas.dtos.PromedioGeneralesEstudianteDTO;
import com.liceo.notas.services.PromedioGeneralesEstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promedios-estudiantes")
public class PromedioGeneralesEstudiante {
    @Autowired
    private PromedioGeneralesEstudianteService service;

    @PostMapping
    public ResponseEntity<PromedioGeneralesEstudianteDTO> crear(@RequestBody PromedioGeneralesEstudianteDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.guardarPromedio(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromedioGeneralesEstudianteDTO> actualizar(
            @PathVariable Integer id,
            @RequestBody PromedioGeneralesEstudianteDTO dto) {
        dto.setId(id);
        return ResponseEntity.ok(service.actualizarPromedio(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.eliminarPromedio(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromedioGeneralesEstudianteDTO> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<PromedioGeneralesEstudianteDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/estudiante/{idUsuario}/curso/{idCurso}")
    public ResponseEntity<PromedioGeneralesEstudianteDTO> obtenerPorEstudianteYCurso(
            @PathVariable String idUsuario,
            @PathVariable Integer idCurso) {
        return ResponseEntity.ok(service.obtenerPorEstudianteYCurso(idUsuario, idCurso));
    }
}
