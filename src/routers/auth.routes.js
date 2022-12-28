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

// input
// {
//   "email": "example+demo@gmail.com",
//   "password": "PBL6@dut@123",
//   "fullName": "PBL6"
// }

// output
// {
//   "status": "success",
//   "data": {
//       "email": "example+demo@gmail.com",
//       "role": "USER",
//       "fullName": "PBL6",
//       "isActivated": false
//   }
// }

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     security:
 *      - BearerAuth: []
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - fullName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *             example:
 *               email: example+demo@gmail.com
 *               password: PBL6@dut@123
 *               fullName: PBL6
 *     responses:
 *       '200':
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - status
 *                 - data
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   required:
 *                     - email
 *                     - role
 *                     - fullName
 *                     - isActivated
 *                   properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: example+demo@gmail.com
 *                     role:
 *                       type: string
 *                       example: USER
 *                     fullName:
 *                       type: string
 *                       example: PBL6
 *                     isActivated:
 *                       type: boolean
 *                       example: false
 *       '400':
 *         description: Something went wrong
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/ErrorBadRequest'
 */

router.post('/register', ValidatorBody('register'), authController.register);

/**
 * @swagger
 *  paths:
 *    /login:
 *      post:
 *        summary: Logs in a user
 *        security:
 *          - BearerAuth: []
 *        tags: [Auth]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - email
 *                  - password
 *                properties:
 *                  email:
 *                    type: string
 *                    format: email
 *                    description: Email address of the user
 *                  password:
 *                    type: string
 *                    description: Password of the user
 *        responses:
 *          200:
 *            description: Successful login
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      enum: [success]
 *                    data:
 *                      type: object
 *                      properties:
 *                        token:
 *                          type: string
 *                          description: JWT token for the user' session
 *                        refreshToken:
 *                          type: string
 *                          description: JWT token for refreshing the user's session
 *                        expiresIn:
 *                          type: string
 *                          description: Expiration time of the token, in milliseconds
 *                        type:
 *                          type: string
 *                          enum: [Bearer]
 *          400:
 *            description: Bad request
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ErrorBadRequest'
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
 *     tags: [Auth]
 *     summary: Refresh token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: ""
 *                     refreshToken:
 *                       type: string
 *                       example: "."
 *                     expiresIn:
 *                       type: string
 *                       example: "3600000"
 *                     type:
 *                       type: string
 *                       example: "Bearer"
 *       400:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ErrorBadRequest'
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
 *  /me:
 *    get:
 *      summary: Get information about the current user
 *      tags: [Auth]
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: The status of the request
 *                    example: success
 *                  data:
 *                    type: object
 *                    properties:
 *                      email:
 *                        type: string
 *                        description: The email address of the user
 *                        example: doantanty92+example@gmail.com
 *                      fullName:
 *                        type: string
 *                        description: The full name of the user
 *                        example: Đoàn Tân Tỵ
 *                      role:
 *                        type: string
 *                        description: The role of the user
 *                        example: USER
 *                      userId:
 *                        type: string
 *                        format: uuid
 *                        description: The unique ID of the user
 *                        example: 160c5b61-9e0f-41fb-a78f-9008e63b4568
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time the user account was created
 *                        example: 2022-12-28T15:52:51.023Z
 *                      avatarUrl:
 *                        type: string
 *                        nullable: true
 *                        description: The URL of the user's avatar image
 *                        example: null
 *        '400':
 *          description: Something went wrong
 *          content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/ErrorBadRequest'
 */

router.get('/me', AuthMiddleware.isRequired, authController.getMe);

/**
 * @swagger
 *   /forgot-password:
 *     post:
 *       summary: Forgot password
 *       tags: [Auth]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: pbl6dut@gmail.com
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: success
 *                   data:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Send verify code successfully
 *         400:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               verifyCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Verify code successfully
 *       400:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorBadRequest'
 *
 */

router.post(
  '/verify-code',
  ValidatorBody('verifyCode'),
  authController.verifyCode
);

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - verifyCode
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               verifyCode:
 *                 type: integer
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Reset password successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *               example:
 *                 status: success
 *                 data:
 *                   message: Reset password successfully
 *       400:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/ErrorBadRequest'
 */

router.post(
  '/reset-password',
  ValidatorBody('resetPassword'),
  authController.resetPassword
);

/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Change password
 *     tags: [Auth]
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Change password successfully
 *       400:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ErrorBadRequest'
 */

router.post(
  '/change-password',
  ValidatorBody('changePassword'),
  AuthMiddleware.isRequired,
  authController.changePassword
);

export default router;
