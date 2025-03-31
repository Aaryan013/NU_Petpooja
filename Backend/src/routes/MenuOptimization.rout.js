import express from "express";
import { optimizeMenu } from "../controllers/MenuOptimization.controllers.js"; // Import the controller function

const router = express.Router();

// Route for menu optimization
router.post("/optimize", optimizeMenu);

export default router;
