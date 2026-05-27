package hvd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="portal_modules")
public class PortalModules {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long id;
	String modulename;
	String modulepath;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getModulename() {
		return modulename;
	}
	public void setModulename(String modulename) {
		this.modulename = modulename;
	}
	public String getModulepath() {
		return modulepath;
	}
	public void setModulepath(String modulepath) {
		this.modulepath = modulepath;
	}
	@Override
	public String toString() {
		return "PortalModules [id=" + id + ", modulename=" + modulename + ", modulepath=" + modulepath + "]";
	}
}
