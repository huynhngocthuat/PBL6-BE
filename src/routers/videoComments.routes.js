import express from 'express';
import { VideoCommentsController } from 'controllers';
import { ValidatorBody } from 'validations';

const router = express.Router();

router.get('/', VideoCommentsController.get);
router.post('/', ValidatorBody('videoComment'), VideoCommentsController.create);

export default router;
