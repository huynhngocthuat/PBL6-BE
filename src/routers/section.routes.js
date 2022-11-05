import express from 'express';
import { SectionsController } from 'controllers';
import { ValidatorBody, ValidatorId } from 'validations';

const router = express.Router();

router.get('/', SectionsController.get);

router.get('/:id', ValidatorId, SectionsController.get);
router.get('/:id/videos', ValidatorId, SectionsController.getVideos);

router.post('/', ValidatorBody('section'), SectionsController.create);

router.put('/:id', ValidatorBody('section'), SectionsController.update);

router.delete('/:id', ValidatorId, SectionsController.delete);

export default router;
