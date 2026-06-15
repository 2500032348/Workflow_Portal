package hvd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hvd.entity.Leave;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
}