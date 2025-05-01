package com.liceo.notas.services;

import com.liceo.notas.dtos.UsuarioDTO;
import com.liceo.notas.dtos.UsuarioMapper;
import com.liceo.notas.entities.Usuario;
import com.liceo.notas.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    @Transactional
    public UsuarioDTO crearUsuario(UsuarioDTO dto) {
        // Verificar si el nickname ya existe
        if(repository.findByNickname(dto.getNickname()).isPresent()) {
            throw new RuntimeException("El nickname ya está en uso");
        }

        Usuario usuario = UsuarioMapper.toEntity(dto);
        usuario = repository.save(usuario);
        return UsuarioMapper.toDTO(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UsuarioDTO> obtenerPorId(String id) {
        return repository.findById(id)
                .map(UsuarioMapper::toDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioDTO> listarTodos() {
        return repository.findAll().stream()
                .map(UsuarioMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Optional<UsuarioDTO> actualizarUsuario(String id, UsuarioDTO dto) {
        return repository.findById(id)
                .map(usuario -> {
                    // Actualizar campos básicos
                    usuario.setNombres(dto.getNombres());
                    usuario.setApellidos(dto.getApellidos());

                    // Verificar si el nickname cambió y es único
                    if(!usuario.getNickname().equals(dto.getNickname())) {
                        if(repository.findByNickname(dto.getNickname()).isPresent()) {
                            throw new RuntimeException("El nuevo nickname ya está en uso");
                        }
                        usuario.setNickname(dto.getNickname());
                    }

                    usuario.setContrasena(dto.getContrasena());
                    usuario.setEstado(dto.getEstado());

                    usuario = repository.save(usuario);
                    return UsuarioMapper.toDTO(usuario);
                });
    }

    @Override
    @Transactional
    public boolean eliminarUsuario(String id) {
        if(repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioDTO> listarPorEstado(String estado) {
        return repository.findByEstado(estado).stream()
                .map(UsuarioMapper::toDTO)
                .collect(Collectors.toList());
    }
}