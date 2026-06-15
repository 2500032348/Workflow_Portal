import mongoose from "mongoose";

const reviewHistorySchema = new mongoose.Schema(
{
    workflowId: {
        type: Number,
        required: true
    },

    employeeName: {
        type: String,
        required: true
    },

    reviewer: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    decision: {
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
        createdAt: "reviewDate",
        updatedAt: false
    }
}
);

const ReviewHistory = mongoose.model(
    "ReviewHistory",
    reviewHistorySchema
);

export default ReviewHistory;