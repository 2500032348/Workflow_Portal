import express from "express";
import * as approvalService from "../service/approvalservice.js";

const router = express.Router();

const actionController = async (req, res) => {
    try {

        const result =
            await approvalService.takeAction(
                req.body
            );

        res.json(result);

    }
    catch (err) {

        res.status(500).json({
            code: 500,
            message: err.message
        });

    }
};

// IMPORTANT ROUTE
router.post("/action", actionController);

export default router;