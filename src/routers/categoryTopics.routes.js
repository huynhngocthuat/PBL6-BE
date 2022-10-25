import express from 'express';
import { CategoryTopicsController } from 'controllers';
import {
  ValidatorBody,
  ValidatorId,
  ValidatorName,
  ValidatorNameUpdate,
} from 'validations';

const router = express.Router();

router.get('/', CategoryTopicsController.get);

router.get('/:id', ValidatorId, CategoryTopicsController.get);

router.post(
  '/',
  ValidatorBody('categoryTopic'),
  ValidatorName,
  CategoryTopicsController.create
);

router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('categoryTopic'),
  ValidatorNameUpdate,
  CategoryTopicsController.update
);

router.delete('/:id', ValidatorId, CategoryTopicsController.delete);

export default router;
