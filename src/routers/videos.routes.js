import express from 'express';
import { VideosController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';

const router = express.Router();

router.get('/', VideosController.get);
router.get('/:id', ValidatorId, VideosController.get);
router.get('/:id/user', ValidatorId, VideosController.getInstructorUploadVideo);

router.post('/', ValidatorBody('video'), VideosController.create);

router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('video'),
  VideosController.update
);

router.delete('/:id', ValidatorId, VideosController.delete);

export default router;
