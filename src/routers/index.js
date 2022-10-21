import express from "express";
import users from "./users.routes";
import auth from "./auth.routes";
import categoryTopics from "./categoryTopics.routes";

const router = express.Router();

router.use("/", users);
router.use("/", auth);
router.use("/category-topics", categoryTopics);

export default router;
