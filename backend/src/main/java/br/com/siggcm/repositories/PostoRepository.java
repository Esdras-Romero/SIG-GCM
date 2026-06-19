package br.com.siggcm.repositories;

import br.com.siggcm.entities.PostoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostoRepository
        extends JpaRepository<PostoEntity, UUID> {
}