import mongoose from "mongoose";

const workflowLogSchema = new mongoose.Schema(
{
    workflowId: {
        type: Number,
        required: true
    },

    action: {
        type: String,
        required: true
    },

    performedBy: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    comments: {
        type: String,
        required: false
    }
},
{
    timestamps: {
        createdAt: "actionTime",
        updatedAt: false
    }
}
);

const WorkflowLogs = mongoose.model(
    "WorkflowLogs",
    workflowLogSchema
);

export default WorkflowLogs;