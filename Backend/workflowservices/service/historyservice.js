import Approval from "../models/approvals.js";
import Workflow from "../models/workflows.js";

// EMPLOYEE HISTORY
export const getEmployeeHistory = async () => {

    const data = await Workflow.find({
        status: {
            $in: ["APPROVED", "REJECTED"]
        }
    }).sort({ createdAt: -1 });

    return {
        code: 200,
        data
    };
};

// MANAGER HISTORY
export const getManagerHistory = async () => {

    const approvedByManager =
        await Approval.find({
            actionByRole: "MANAGER"
        });

    const submittedByManager =
        await Workflow.find({
            submittedByRole: "MANAGER",
            status: "APPROVED"
        });

    return {
        code: 200,
        approvedByManager,
        submittedByManager
    };
};

// HR HISTORY
export const getHRHistory = async () => {

    const approvedByHR =
        await Approval.find({
            actionByRole: "HR"
        });

    const submittedByHR =
        await Workflow.find({
            submittedByRole: "HR",
            status: "APPROVED"
        });

    return {
        code: 200,
        approvedByHR,
        submittedByHR
    };
};

// ADMIN HISTORY
export const getAdminHistory = async () => {

    const approvedByAdmin =
        await Approval.find({
            actionByRole: "ADMIN"
        });

    return {
        code: 200,
        approvedByAdmin
    };
};