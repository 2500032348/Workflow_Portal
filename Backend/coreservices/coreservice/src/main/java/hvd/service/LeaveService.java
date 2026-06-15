package hvd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hvd.entity.Leave;
import hvd.repository.LeaveRepository;

import java.util.List;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository repo;

    public Leave saveLeave(Leave leave) {
        return repo.save(leave);
    }

    public List<Leave> getAllLeaves() {
        return repo.findAll();
    }
    public void deleteLeave(Long id) {
        repo.deleteById(id);
    }
}