import WorkflowLogs from "../models/workflowlogs.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRETE_KEY = process.env.SECRETE_KEY;

export async function saveLog(data, token) {
    let response;

    try {
        const payload = jwt.verify(token, SECRETE_KEY);

        data.performedBy = payload.crid;

        await WorkflowLogs.create(data);

        response = {
            code: 200,
            message: "Workflow log saved successfully"
        };
    }
    catch (e) {
        response = {
            code: 500,
            message: e.message
        };
    }

    return response;
}

export async function getAllLogs(page, size, token) {
    let response;

    try {
        jwt.verify(token, SECRETE_KEY);

        const skip = (page - 1) * size;

        const logs = await WorkflowLogs.find()
            .skip(skip)
            .limit(size)
            .sort({ _id: 1 });

        const totalrecords = await WorkflowLogs.countDocuments();

        response = {
            code: 200,
            page: page,
            size: size,
            totalpages: Math.ceil(totalrecords / size),
            logs: logs
        };
    }
    catch (e) {
        response = {
            code: 500,
            message: e.message
        };
    }

    return response;
}

export async function getLogsByWorkflowId(workflowId, token) {
    let response;

    try {
        jwt.verify(token, SECRETE_KEY);

        const logs = await WorkflowLogs.find({
            workflowId: workflowId
        });

        response = {
            code: 200,
            logs: logs
        };
    }
    catch (e) {
        response = {
            code: 500,
            message: e.message
        };
    }

    return response;
}

export async function deleteLog(id, token) {
    let response;

    try {
        jwt.verify(token, SECRETE_KEY);

        await WorkflowLogs.findOneAndDelete({
            _id: id
        });

        response = {
            code: 200,
            message: "Workflow log deleted successfully"
        };
    }
    catch (e) {
        response = {
            code: 500,
            message: e.message
        };
    }

    return response;
}