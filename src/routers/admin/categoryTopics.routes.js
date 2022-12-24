import express from 'express';
import { CategoryTopicsController } from 'controllers';
import { CategoryTopicsService as categoryTopicService } from 'services';

import {
  ValidatorBody,
  ValidatorId,
  ValidatorName,
  ValidatorNameUpdate,
} from 'validations';
import AuthMiddleware from 'middlewares/auth';

const router = express.Router();

router.get('/', AuthMiddleware.isRequired, CategoryTopicsController.get);

router.get('/:id', ValidatorId, CategoryTopicsController.get);
router.post(
  '/',
  ValidatorBody('categoryTopic'),
  ValidatorName(categoryTopicService, 'categoryTopic'),
  CategoryTopicsController.create
);
router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('categoryTopic'),
  ValidatorNameUpdate(categoryTopicService, 'categoryTopic'),
  CategoryTopicsController.update
);
router.delete('/:id', ValidatorId, CategoryTopicsController.delete);

export default router;
