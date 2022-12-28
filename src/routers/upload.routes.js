import express from 'express';
import multer from 'multer';
import { UploadController } from 'controllers';
import AuthMiddleware from 'middlewares/auth';
import { roles } from 'constants';

const upload = multer();
const router = express.Router();

// Middle ware
router.use(AuthMiddleware.isRequired);

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: The file managing API
 */

/**
 * @swagger
 * /upload/image:
 *   post:
 *      summary: Upload image to system
 *      security:
 *       - BearerAuth: []
 *      tags: [Files]
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required:
 *                - file
 *              properties:
 *                file:
 *                  description: File image to upload
 *                  type: string
 *                  format: binary
 *                  required: true
 *      responses:
 *        200:
 *          description: Image upload success and infor of image will be returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/FileResponse'
 *        400:
 *          description: Something wrong while upload file
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.post(
  '/image',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE, roles.USER_ROLE),
  upload.single('file'),
  UploadController.uploadImage
);

/**
 * @swagger
 * /upload/video:
 *   post:
 *      summary: Upload video to system
 *      security:
 *       - BearerAuth: []
 *      tags: [Files]
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required:
 *                - file
 *              properties:
 *                file:
 *                  description: File videoa to upload
 *                  type: string
 *                  format: binary
 *                  required: true
 *      responses:
 *        200:
 *          description: Video upload success and infor of video will be returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/FileResponse'
 *        400:
 *          description: Something wrong while upload file
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.post(
  '/video',
  AuthMiddleware.isRole(roles.INSTRUCTOR_ROLE),
  upload.single('file'),
  UploadController.uploadVideo
);

export default router;
