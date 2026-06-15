package hvd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import hvd.entity.Leave;
import hvd.service.LeaveService;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:5173")
public class LeaveController {

    @Autowired
    private LeaveService service;

    @PostMapping
    public Leave create(@RequestBody Leave leave) {

        Leave saved = service.saveLeave(leave);

        System.out.println("Saved ID: " + saved.getId());
        System.out.println("Saved Leave Type: " + saved.getLeaveType());

        return saved;
    }

    @GetMapping
    public List<Leave> getAll() {
        return service.getAllLeaves();
    }
    
    @DeleteMapping("/{id}")
    public String deleteLeave(@PathVariable Long id) {

        service.deleteLeave(id);

        return "Leave deleted successfully";
    }
}