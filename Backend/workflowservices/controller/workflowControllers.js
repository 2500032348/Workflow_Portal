import express from "express";
import * as workflowservice from "../service/workflowservice.js";

const router = express.Router();

router.post("/createworkflow", async (req, res) => {
    res.json(
        await workflowservice.createWorkflow(
            req.body,
            req.headers["token"]
        )
    );
});

router.get("/getallworkflows/:PAGE/:SIZE", async (req, res) => {

    const { PAGE, SIZE } = req.params;

    const response =
        await workflowservice.getAllWorkflows(
            PAGE,
            SIZE,
            req.headers.token
        );

    res.json(response);
});

router.delete("/deleteworkflow/:ID", async (req, res) => {

    console.log("DELETE HIT");
    console.log(req.params.ID);

    const { ID } = req.params;

    const response =
        await workflowservice.deleteWorkflow(
            ID,
            req.headers["token"]
        );

    res.json(response);
});

/* NEW API */

router.get("/pending/:ROLE", async (req, res) => {

    const { ROLE } = req.params;

    const response =
        await workflowservice.getPendingWorkflowsByRole(
            ROLE
        );

    res.json(response);
});

export default router;