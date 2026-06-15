import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovalHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchAllHistory();
    }, []);

    const deleteHistory = async (leave) => {

    if (!window.confirm("Are you sure you want to delete this record?"))
        return;

    try {

        // MongoDB record
        if (leave._id) {

            await axios.delete(
                 `http://localhost:8002/workflow/deleteworkflow/${leave._id}`
            );
        }

        // PostgreSQL record
        else {

            await axios.delete(
                `http://localhost:8081/api/leaves/${leave.id}`
            );
        }

        fetchAllHistory();

    } catch (error) {

        console.error("Delete failed:", error);

    }
};

const fetchAllHistory = async () => {
    try {
        // ✅ ONLY MONGO (WORKING SOURCE)
        const mongoRes = await axios.get(
            "http://localhost:8002/history/employee"
        );

        console.log("MONGO RESPONSE:", mongoRes.data);

        const mongoData = mongoRes.data?.data || [];

        // 🔥 SAFE: no PG call (prevents 404 crash)
        const pgData = [];

        // merge safely
        const combined = [...mongoData, ...pgData];

        // sort safely
        combined.sort(
            (a, b) =>
                new Date(b.submittedDate || b.createdAt || 0) -
                new Date(a.submittedDate || a.createdAt || 0)
        );

        setHistory(combined);
    } catch (error) {
        console.error("Error fetching approval history:", error);
        setHistory([]); // safe fallback
    }
};

    return (
        <div className="umanager">

            <div className="umanager-header">
                <label>Approval History</label>
            </div>

            <div className="umanager-content">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Submitted Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {history.map((leave, index) => (
                            <tr key={leave.id || leave._id || index}>
                                <td>{leave.id || leave._id}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.fromDate}</td>
                                <td>{leave.toDate}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.status}</td>

                                {/* 🔥 important: show where it came from */}
                               
                               <td>
  {leave.submittedByRole ||
   leave.submittedRole ||
   "N/A"}
</td>
 <td>
                <button
                    className="delete-btn"
                    onClick={() => deleteHistory(leave)}
                >
                    Delete
                </button>
            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ApprovalHistory;