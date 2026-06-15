import Approval from "../models/approvals.js";
import Workflow from "../models/workflows.js";

// APPROVE / REJECT
export const takeAction = async (data) => {

    // Save approval history
    const approval = new Approval(data);
    await approval.save();

    // Find workflow
    const workflow = await Workflow.findById(
        data.workflowId
    );

    if (!workflow) {
        throw new Error("Workflow not found");
    }

    // If rejected at any stage
    if (data.action === "REJECTED") {

        workflow.status = "REJECTED";

        await workflow.save();

        return {
            message: "Workflow rejected successfully"
        };
    }

    // Remove current approver role
    workflow.pendingWithRoles =
        workflow.pendingWithRoles.filter(
            role => role !== data.actionByRole
        );

    // If nobody left
    if (workflow.pendingWithRoles.length === 0) {

        workflow.status = "APPROVED";

    } else {

        workflow.status = "PENDING";

    }

    await workflow.save();

    return {
        message: "Workflow approved successfully"
    };
};