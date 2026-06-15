import React, { useState, useEffect } from "react";
import axios from "axios";

const SubmitLeave = () => {

    const [leaveData, setLeaveData] = useState([]);

    const [formData, setFormData] = useState({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: ""
    });

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/api/leaves"
            );
            setLeaveData(response.data);
        } catch (error) {
            console.error("Error fetching leaves:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submitLeave = async () => {

        if (
            !formData.leaveType ||
            !formData.fromDate ||
            !formData.toDate ||
            !formData.reason
        ) {
            alert("Please fill all fields");
            return;
        }
        const role = localStorage.getItem("role");

const roleName =
    role === "1" ? "Employee" :
    role === "2" ? "Manager" :
    role === "3" ? "HR" :
    "Unknown";

        const newLeave = {
            leaveType: formData.leaveType,
            fromDate: formData.fromDate,
            toDate: formData.toDate,
            reason: formData.reason,
            status: "Pending",
           submittedBy: roleName,
           submittedRole: roleName,
            submittedDate: new Date().toISOString().split("T")[0]
        };

        try {

            await axios.post(
                "http://localhost:8081/api/leaves",
                newLeave
            );
const workflowData = {
    workflowId: Date.now(),
    leaveType: formData.leaveType,
    fromDate: formData.fromDate,
    toDate: formData.toDate,
    reason: formData.reason,
    submittedByRole: roleName.toUpperCase()
};

const token = localStorage.getItem("token");

await axios.post(
    "http://localhost:8002/workflow/createworkflow",
    workflowData,
    {
        headers: {
            token: token
        }
    }
);
            await fetchLeaves();

            setFormData({
                leaveType: "",
                fromDate: "",
                toDate: "",
                reason: ""
            });

            alert("Leave Submitted Successfully");

        } catch (error) {
            console.error("Error submitting leave:", error);
        }
    };

    return (
        <div className="umanager">

            <div className="umanager-header">
                <label>Submit Leave</label>
            </div>

            <div
                className="popup"
                style={{
                    position: "relative",
                    marginBottom: "20px",
                    width: "100%"
                }}
            >

                <label>Leave Type</label>
                <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                >
                    <option value="">Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Earned Leave">Earned Leave</option>
                </select>

                <label>From Date</label>
                <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                />

                <label>To Date</label>
                <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                />

                <label>Reason</label>
                <textarea
                    rows="3"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                />

                <button onClick={submitLeave}>
                    Submit Leave
                </button>

            </div>

            <div className="umanager-content">

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Leave Type</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Submitted By</th>
                            <th>Submitted Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leaveData.map((leave, index) => (
                            <tr key={leave.id || index}>
                                <td>{leave.id}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.fromDate}</td>
                                <td>{leave.toDate}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.status}</td>
                                <td>{leave.submittedBy}</td>
                                <td>{leave.submittedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
};

export default SubmitLeave;