import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard", user: req.user });
});

export default router;
