import express from "express";
import * as workflowlogservice from "../service/workflowLogservice.js";

const router = express.Router();

router.post("/savelog", async (req, res) => {
    res.json(
        await workflowlogservice.saveLog(
            req.body,
            req.headers["token"]
        )
    );
});

router.get("/getalllogs/:PAGE/:SIZE", async (req, res) => {
    const { PAGE, SIZE } = req.params;

    const response = await workflowlogservice.getAllLogs(
        PAGE,
        SIZE,
        req.headers["token"]
    );

    res.json(response);
});

router.get("/getlogsbyworkflow/:WORKFLOWID", async (req, res) => {
    const { WORKFLOWID } = req.params;

    const response = await workflowlogservice.getLogsByWorkflowId(
        WORKFLOWID,
        req.headers["token"]
    );

    res.json(response);
});

router.delete("/deletelog/:ID", async (req, res) => {
    const { ID } = req.params;

    const response = await workflowlogservice.deleteLog(
        ID,
        req.headers["token"]
    );

    res.json(response);
});

export default router;