import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized to see this protected content",
    userId: req.user.id,
  });
});
export default router;
