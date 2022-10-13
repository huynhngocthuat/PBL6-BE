import express from "express";
const router = express.Router();

// GET /api/v1/me
router.get("/me", (req, res) => {
  res.send("Me");
});

export default router;
