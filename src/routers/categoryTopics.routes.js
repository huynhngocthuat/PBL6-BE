import express from "express";
const router = express.Router();
import { CategoryTopicsController } from "controllers";
import {
  Validators,
  ValidatorId,
  ValidatorName,
  ValidatorNameUpdate,
} from "validations";

router.get("/", CategoryTopicsController.get);

router.get("/:id", ValidatorId, CategoryTopicsController.get);

router.post(
  "/",
  Validators("categoryTopic"),
  ValidatorName,
  CategoryTopicsController.create
);

router.put(
  "/:id",
  ValidatorId,
  Validators("categoryTopic"),
  ValidatorNameUpdate,
  CategoryTopicsController.update
);

router.delete("/:id", ValidatorId, CategoryTopicsController.delete);

export default router;
