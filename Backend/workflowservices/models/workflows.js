import mongoose from "mongoose";

const workflowSchema = new mongoose.Schema({
    workflowId: {
        type: Number,
        required: true
    },
    leaveType: String,
    fromDate: String,
    toDate: String,
    reason: String,

    submittedBy: String,
    submittedByRole: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "PENDING"
    },

    pendingWithRoles: {
        type: [String],
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("workflows", workflowSchema);