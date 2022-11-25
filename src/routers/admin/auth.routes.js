import express from 'express';
import { authController } from 'controllers';
import { ValidatorBody } from 'validations';
import AuthMiddleware from 'middlewares/auth';

const router = express.Router();

router.post('/login', ValidatorBody('login'), authController.adminLogin);

router.post('/logout', AuthMiddleware.isRequired, authController.logout);

router.post(
  '/refresh-token',
  ValidatorBody('refreshToken'),
  authController.refreshToken
);

router.get('/me', AuthMiddleware.isRequired, authController.getMe);

export default router;
