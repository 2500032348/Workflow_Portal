import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema({
    workflowId: String,
    actionByRole: String,
    action: String, // APPROVED / REJECTED
    comments: String,
    actionDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("approvals", approvalSchema);