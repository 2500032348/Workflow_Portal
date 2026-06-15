import express from "express";
import * as historyservice from "../service/historyservice.js";

const router = express.Router();

router.get("/employee", async (req, res) => {
    res.json(await historyservice.getEmployeeHistory());
});

router.get("/manager", async (req, res) => {
    res.json(await historyservice.getManagerHistory());
});

router.get("/hr", async (req, res) => {
    res.json(await historyservice.getHRHistory());
});

router.get("/admin", async (req, res) => {
    res.json(await historyservice.getAdminHistory());
});

export default router;