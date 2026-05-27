package hvd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="role_assignments")
public class RoleAssignments {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    Users user;

    @ManyToOne
    @JoinColumn(name="role_id")
    SystemRoles role;

    @ManyToOne
    @JoinColumn(name="module_id")
    PortalModules module;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public SystemRoles getRole() {
        return role;
    }

    public void setRole(SystemRoles role) {
        this.role = role;
    }

    public PortalModules getModule() {
        return module;
    }

    public void setModule(PortalModules module) {
        this.module = module;
    }

    @Override
    public String toString() {
        return "RoleAssignments [id=" + id + ", user=" + user + ", role=" + role + ", module=" + module + "]";
    }
}