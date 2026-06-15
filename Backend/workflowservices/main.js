import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import workflowRouter from "./controller/workflowControllers.js";
import workflowLogRouter from "./controller/workflowlogControllers.js";
import approvalRouter from "./controller/approvalControllers.js";
import reviewRouter from "./controller/reviewControllers.js";
import historyRouter from "./controller/historyControllers.js";


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Load Environment Variables
dotenv.config();

// Database Connection
connectDB();

// Register Routes
app.use("/workflow", workflowRouter);
app.use("/approval", approvalRouter);
app.use("/review", reviewRouter);
app.use("/workflowlog", workflowLogRouter);
app.use("/history", historyRouter);

// Default Route
app.get("/", async (req, res) => {
    res.json({
        code: 200,
        message: "Workflow Approval and Review Portal Started..."
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});