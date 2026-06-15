import Workflow from "../models/workflows.js";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const SECRETE_KEY = process.env.SECRETE_KEY;

// ROLE ROUTING LOGIC
const getPendingRoles = (role) => {

    switch (String(role)) {

        case "1":
            return ["MANAGER","HR","ADMIN"];

        case "2":
            return ["HR","ADMIN"];

        case "3":
            return ["ADMIN"];

        case "4":
            return [];

        default:
            return [];
    }
};

export const createWorkflow = async (data, token) => {
    let response;

    try {

        const payload = jwt.verify(token, SECRETE_KEY);

        console.log(payload); // 👈 ADD HERE

        data.submittedBy = payload.crid;

        data.submittedByRole = payload.role;

        const pendingWithRoles =
            getPendingRoles(data.submittedByRole);

        data.status =
            pendingWithRoles.length > 0
                ? "PENDING"
                : "COMPLETED";

        data.pendingWithRoles = pendingWithRoles;

        await Workflow.create(data);

        response = {
            code: 200,
            message: "Workflow created successfully"
        };

    } catch (e) {
        response = {
            code: 500,
            message: e.message
        };
    }

    return response;
};

// GET ALL WORKFLOWS (pagination support)
export const getAllWorkflows = async (page = 1, size = 10, token) => {

    const skip = (page - 1) * size;

    const data = await Workflow.find()
        .skip(skip)
        .limit(parseInt(size));

    const total = await Workflow.countDocuments();

    return {
        data,
        total,
        page: Number(page),
        size: Number(size)
    };
};

export const deleteWorkflow = async (id) => {

    console.log("Trying to delete:", id);

    const result = await Workflow.findByIdAndDelete(id);

    console.log("Result:", result);

    if (!result) {
        return {
            message: "Workflow not found"
        };
    }

    return {
        message: "Workflow deleted successfully"
    };
};





// GET PENDING WORKFLOWS BY ROLE
export const getPendingWorkflowsByRole = async (role) => {
    let response;

    try {
        const data = await Workflow.find({
            status: "PENDING",
            pendingWithRoles: role
        });

        response = {
            code: 200,
            data
        };
    }
    catch (e) {
        response = {
            code: 500,
            message: e.message
        };
    }

    return response;
};