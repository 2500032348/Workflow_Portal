import React, { useState } from "react";

const WorkflowDetails = () => {
  const [workflowDetails] = useState([]);

  return (
    <div className="umanager">

      {/* HEADER */}
      <div className="umanager-header">
        <label>Workflow Details</label>
      </div>

      {/* TABLE */}
      <div className="umanager-content">

        <table>
          <thead>
            <tr>
              <th>Workflow ID</th>
              <th>Action</th>
              <th>Performed By</th>
              <th>Role</th>
              <th>Comments</th>
              <th>Action Time</th>
            </tr>
          </thead>

          <tbody>
            {workflowDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.workflowId}</td>
                <td>{item.action}</td>
                <td>{item.performedBy}</td>
                <td>{item.role}</td>
                <td>{item.comments}</td>
                <td>{item.actionTime}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default WorkflowDetails;