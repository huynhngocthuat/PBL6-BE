import express from "express";
const router = express.Router();
import { CategoryTopicsController } from "controllers";
import { Validators } from "validations";

router.get("/", CategoryTopicsController.get);

router.get("/:id", CategoryTopicsController.get);

router.post("/", Validators("categoryTopic"), CategoryTopicsController.create);

router.put(
  "/:id",
  Validators("categoryTopic"),
  CategoryTopicsController.update
);

router.delete("/:id", CategoryTopicsController.delete);

export default router;
