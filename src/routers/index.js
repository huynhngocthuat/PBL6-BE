import express from "express";
import users from "./users.routes";
import auth from "./auth.routes";

const router = express.Router();

router.use("/", users);
router.use("/", auth);

export default router;
