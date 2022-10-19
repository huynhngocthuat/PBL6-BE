import express from "express";
const router = express.Router();
import { authController } from "controllers/";
import { authValidation } from "validations";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - password
 *          properties:
 *            name:
 *              type: string
 *              example: "doantanty92"
 *              description: The name of the user.
 *            email:
 *              type: string
 *              example: "doantanty92@gmail.com"
 *              description: The email of the user.
 *            password:
 *              type: string
 *              example: "123456"
 *              description: The password of the user.
 *     responses:
 *      200:
 *          description: The user was successfully created
 *      500:
 *          description: Some server error
 */

router.post(
  "/register",
  authValidation.registerValidation,
  authController.register
);

router.get("/login", authValidation.loginValidation, authController.login);

router.get(
  "/confirm/:confirmToken",
  authValidation.confirmEmailValidation,
  authController.confirmEmail
);

export default router;
