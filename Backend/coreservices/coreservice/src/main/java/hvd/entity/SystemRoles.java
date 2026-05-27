package hvd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="system_roles")
public class SystemRoles {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long id;
	String rolename;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	@Override
	public String toString() {
		return "SystemRoles [id=" + id + ", rolename=" + rolename + "]";
	}
}
