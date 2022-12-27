import express from 'express';
import { HashtagsController } from 'controllers';
import { HashtagsService as hashtagsService } from 'services';

import {
  ValidatorBody,
  ValidatorId,
  ValidatorName,
  ValidatorNameUpdate,
} from 'validations';

const router = express.Router();

router.get('/', HashtagsController.get);

router.get('/:id', ValidatorId, HashtagsController.get);

router.post(
  '/',
  ValidatorBody('hashtag'),
  ValidatorName(hashtagsService, 'hashtag'),
  HashtagsController.create
);

router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('hashtag'),
  ValidatorNameUpdate(hashtagsService, 'hashtag'),
  HashtagsController.update
);

router.delete('/:id', ValidatorId, HashtagsController.delete);

export default router;
