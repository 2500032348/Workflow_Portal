package hvd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hvd.entity.SystemRoles;

@Repository
public interface RoleRepository extends JpaRepository<SystemRoles, Long> {
	
}
