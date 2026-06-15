import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingApprovals = () => {

    const [approvals, setApprovals] = useState([]);

    useEffect(() => {
        loadApprovals();
    }, []);
const loadApprovals = async () => {

    try {

        const roleId = localStorage.getItem("role");

        const role =
            roleId === "1" ? "EMPLOYEE" :
            roleId === "2" ? "MANAGER" :
            roleId === "3" ? "HR" :
            "ADMIN";

        const response = await axios.get(
            `http://localhost:8002/workflow/pending/${role}`
        );

        setApprovals(response.data.data);

    }
    catch (err) {

        console.log(err);

    }
};

const takeAction = async (workflowId, action) => {

    try {

        const roleId = localStorage.getItem("role");

        const role =
            roleId === "1" ? "EMPLOYEE" :
            roleId === "2" ? "MANAGER" :
            roleId === "3" ? "HR" :
            "ADMIN";

        const payload = {
            workflowId: workflowId,
            actionByRole: role,
            action: action,
            comments:
                action === "APPROVED"
                    ? `Approved by ${role}`
                    : `Rejected by ${role}`
        };

        await axios.post(
            "http://localhost:8002/approval/action",
            payload
        );

        alert("Action completed successfully");

        loadApprovals();

    }
    catch (err) {

        console.log(err);

        alert("Failed to process action");

    }
};

    return (

        <div className="umanager">

            <div className="umanager-header">
                <label>Pending Approvals</label>
            </div>

            <div className="umanager-content">

                <table>

                    <thead>

                        <tr>

                            <th>Workflow ID</th>
                            <th>Leave Type</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {approvals.map((item) => (

                            <tr key={item._id}>

                                <td>{item.workflowId}</td>
                                <td>{item.leaveType}</td>
                                <td>{item.fromDate}</td>
                                <td>{item.toDate}</td>
                                <td>{item.reason}</td>
                                <td>{item.status}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            takeAction(
                                                item._id,
                                                "APPROVED"
                                            )
                                        }
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() =>
                                            takeAction(
                                                item._id,
                                                "REJECTED"
                                            )
                                        }
                                    >
                                        Reject
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

export default PendingApprovals;