package com.liceo.notas.controllers;

import com.liceo.notas.dtos.ActividadDTO;
import com.liceo.notas.services.ActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de actividades del sistema de notas.
 * Proporciona endpoints para crear, consultar y eliminar actividades.
 * Todos los endpoints tienen como prefijo "/api/actividades".
 */
@RestController
@RequestMapping("/api/actividades")
public class ActividadController {

    @Autowired
    private ActividadService service;

    @PostMapping
    public ResponseEntity<ActividadDTO> crear(@RequestBody ActividadDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crearActividad(dto));
    }

    @GetMapping("/parcial/{idParcial}")
    public ResponseEntity<List<ActividadDTO>> listarPorParcial(@PathVariable Integer idParcial) {
        return ResponseEntity.ok(service.listarPorParcial(idParcial));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActividadDTO> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        service.eliminarActividad(id);
        return ResponseEntity.noContent().build();
    }
}