import express from "express";
import * as reviewservice from "../service/reviewservice.js";

const router = express.Router();

router.post("/createreview", async (req, res) => {
    res.json(
        await reviewservice.createReview(
            req.body,
            req.headers["token"]
        )
    );
});

router.get("/getallreviews/:PAGE/:SIZE", async (req, res) => {
    const { PAGE, SIZE } = req.params;

    const response = await reviewservice.getAllReviews(
        PAGE,
        SIZE,
        req.headers["token"]
    );

    res.json(response);
});

router.delete("/deletereview/:ID", async (req, res) => {
    const { ID } = req.params;

    const response = await reviewservice.deleteReview(
        ID,
        req.headers["token"]
    );

    res.json(response);
});

export default router;