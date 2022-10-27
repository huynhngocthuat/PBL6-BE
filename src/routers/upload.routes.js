import express from 'express';
import multer from 'multer';
import { UploadController } from 'controllers';

const upload = multer();
const router = express.Router();

router.post('/image', upload.single('file'), UploadController.uploadImage);
router.post('/video', upload.single('file'), UploadController.uploadVideo);

export default router;
