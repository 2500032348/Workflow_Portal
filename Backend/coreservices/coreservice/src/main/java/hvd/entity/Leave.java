package hvd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Leave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String leaveType;
    private String fromDate;
    private String toDate;
    private String reason;
    private String status;
    private String submittedBy;
    private String submittedDate;
    private String submittedRole;

    public Leave() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(String submittedBy) {
        this.submittedBy = submittedBy;
    }

    public String getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(String submittedDate) {
        this.submittedDate = submittedDate;
    }
    

	public String getSubmittedRole() {
		return submittedRole;
	}

	public void setSubmittedRole(String submittedRole) {
		this.submittedRole = submittedRole;
	}

	@Override
	public String toString() {
		return "Leave [id=" + id + ", leaveType=" + leaveType + ", fromDate=" + fromDate + ", toDate=" + toDate
				+ ", reason=" + reason + ", status=" + status + ", submittedBy=" + submittedBy + ", submittedDate="
				+ submittedDate + "]";
	}
	
    
    
}