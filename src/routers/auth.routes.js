import express from 'express';
import { authController } from 'controllers';
import { ValidatorBody, ValidatorParams } from 'validations';
import AuthMiddleware from 'middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 */

/**
 * @swagger
 * /register:
 *    post:
 *      summary: Create a new user
 *      tags: [Auth]
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create.
 *          schema:
 *            type: object
 *            required:
 *              - fullName
 *              - email
 *              - password
 *            properties:
 *              fullName:
 *                type: string
 *                example: "PBL6"
 *                description: The name of the user.
 *              email:
 *                type: string
 *                example: "pbl6dut.tttln@gmail.com"
 *                description: The email of the user.
 *              password:
 *                type: string
 *                example: "PBL6@dut@123"
 *                description: The password of the user.
 *      responses:
 *        200:
 *          description: The password was successfully reset
 *          schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: "success"
 *             data:
 *               type: object
 *               properties:
 *                email:
 *                  type: string
 *                  example: "pbl6dut.tttln@gmail.com"
 *                  description: The email of the user.
 *                role:
 *                  type: string
 *                  example: "USER"
 *                fullName:
 *                  type: string
 *                  example: "PBL6"
 *                  description: The name of the user.
 *                isActivated:
 *                  type: boolean
 *                  example: false
 *        400:
 *          description: Register failed
 */

router.post('/register', ValidatorBody('register'), authController.register);

/**
 * @swagger
 * /login:
 *    post:
 *      summary: Login
 *      tags: [Auth]
 *      parameters:
 *        - in: body
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                example: "pbl6dut.tttln@gmail.com"
 *                description: The email of the user.
 *              password:
 *                type: string
 *                example: "PBL6@dut@123"
 *                description: The password of the user.
 *      responses:
 *        200:
 *          description: Login successfully
 *          schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: "success"
 *             data:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *                  description: The token of the user.
 *                refreshToken:
 *                  type: string
 *                  description: The refresh token of the user.
 *                expiresIn:
 *                  type: string
 *                  example: "3600000"
 *                  description: The time of the token expires.
 *                type:
 *                  type: string
 *                  example: "Bearer"
 *        400:
 *          description: Register failed
 */

router.post('/login', ValidatorBody('login'), authController.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *      200:
 *          description: Logout successfully
 */
router.post('/logout', AuthMiddleware.isRequired, authController.logout);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh token
 *     tags: [Auth]
 *     parameters:
 *      - in: body
 *        name: refreshToken
 *        description: The refresh token to refresh.
 *        schema:
 *          type: object
 *          required:
 *            - refreshToken
 *          properties:
 *            refreshToken:
 *              type: string
 *              description: The refresh token of the user.
 *     responses:
 *      200:
 *        description: The jwt token was successfully created
 *      400:
 *          description: Refresh token is incorrect
 */

router.post(
  '/refresh-token',
  ValidatorBody('refreshToken'),
  authController.refreshToken
);

/**
 * @swagger
 * /confirm-email/{confirmToken}:
 *   get:
 *     summary: Confirm email
 *     tags: [Auth]
 *     parameters:
 *      - in: path
 *        name: confirmToken
 *        description: The confirm token to confirm.
 *        schema:
 *          type: object
 *          required:
 *            - confirmToken
 *          properties:
 *            confirmToken:
 *            type: string
 *            description: The confirm token of the user.
 *     responses:
 *      200:
 *          description: The jwt token was successfully created
 *      400:
 *          description: Refresh token is incorrect
 */

router.get(
  '/confirm-email/:confirmToken',
  ValidatorParams('confirmToken'),
  authController.confirmEmail
);

/**
 * @swagger
 * /me:
 *    get:
 *      summary: Get user information
 *      tags: [Auth]
 *      responses:
 *        200:
 *          description: The user information
 *          schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: "success"
 *             data:
 *               type: object
 *               properties:
 *                email:
 *                  type: string
 *                  example: "pbl6dut.tttln@gmail.com"
 *                  description: The email of the user.
 *                fullName:
 *                  type: string
 *                  example: "PBL6"
 *                  description: The name of the user.
 *                role:
 *                  type: string
 *                  example: "USER"
 *                userId:
 *                  type: string
 *                  example: "035c2785-0041-4ad5-bd18-4a2a894a9414"
 *                  description: The id of the user.
 *                avatarUrl:
 *                  type: string
 *                  example: "https://images.unsplash.com/photo-1667985847417-fbb8b638a2ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
 *                  description: The avatar url of the user.
 *        400:
 *          description: The password was not reset
 */

router.get('/me', AuthMiddleware.isRequired, authController.getMe);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary:  Forgot password
 *     tags: [Auth]
 *     parameters:
 *      - in: body
 *        name: email
 *        description: The email to send verify code.
 *        schema:
 *          type: object
 *          required:
 *           - email
 *          properties:
 *            email:
 *              type: string
 *              description: The email of the user.
 *              example: "pbl6@gmail.com"
 *     responses:
 *      200:
 *          description: The email was successfully sent
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                example: "success"
 *              data:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Send verify code successfully"
 *      400:
 *          description: Email is incorrect
 */

router.post(
  '/forgot-password',
  ValidatorBody('emailExists'),
  authController.forgotPassword
);

/**
 * @swagger
 * /verify-code:
 *   post:
 *     summary: Verify code
 *     tags: [Auth]
 *     parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - verifyCode
 *          properties:
 *            email:
 *              type: string
 *              example: "pbl6dut@gmail.com"
 *              description: The email of the user.
 *            verifyCode:
 *              type: number
 *              example: 9999
 *              description: The verify code of the user.
 *     responses:
 *      200:
 *          description: The verify code was successfully verified
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                example: "success"
 *              data:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Reset password successfully"
 *      400:
 *         description:  Verify code is incorrect
 */

router.post(
  '/verify-code',
  ValidatorBody('verifyCode'),
  authController.verifyCode
);

/**  
@swagger
*  /reset-password:
*    post:
*      summary: Reset password
*      tags: [Auth]
*      parameters:
*        - in: body
*          schema:
*            type: object
*            required:
*              - email
*              - password
*              - verifyCode
*            properties:
*              email:
*                type: string
*                example: "pbl6dut@gmail.com"
*                description: The email of the user.
*              password:
*                type: string
*                example: "PBL6@dut@123"
*                description: The password of the user.
*              verifyCode:
*                type: number
*                example: 9999
*                description: The verify code of the user.
*      responses:
*        200:
*          description: The password was successfully reset
*          schema:
*            type: object
*            properties:
*              status:
*                type: string
*                example: "success"
*              data:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    example: "Reset password successfully"
*        400:
*          description: The password was not reset
*/

router.post(
  '/reset-password',
  ValidatorBody('resetPassword'),
  authController.resetPassword
);

/**  
@swagger
*  /change-password:
*    post:
*      summary: Change password
*      tags: [Auth]
*      parameters:
*        - in: body
*          schema:
*            type: object
*            required:
*              - oldPassword
*              - newPassword
*            properties:
*              oldPassword:
*                type: string
*                example: "PBL6@dut@123"
*                description: The old password of the user.
*              newPassword:
*                type: string
*                example: "PBL6@12asc1"
*                description: The new password of the user.
*      responses:
*        200:
*          description: The password was successfully reset
*          schema:
*            type: object
*            properties:
*              status:
*                type: string
*                example: "success"
*              data:
*                type: object
*                properties:
*                  message:
*                    type: string
*                    example: "Change password successfully"
*        400:
*          description: The password was not reset
*/
router.post(
  '/change-password',
  ValidatorBody('changePassword'),
  AuthMiddleware.isRequired,
  authController.changePassword
);

export default router;
