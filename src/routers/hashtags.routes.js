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

/**
 * @swagger
 * tags:
 *   name: Hashtags
 *   description: The hashtag managing API
 */

/**
 * @swagger
 * /hashtags:
 *    get:
 *      summary: Get list hashtag
 *      tags: [Hashtags]
 *      parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          minimum: 1
 *        required: false
 *        example: 1
 *        description: The number of page to query for hashtag
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          minimum: 1
 *          default: 10
 *        required: false
 *        example: 10
 *        description: The numbers of items to return
 *      responses:
 *        200:
 *          description: Status success and information about hashtag
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/HashtagResponse'
 *                  pagination:
 *                    $ref: '#/components/schemas/Pagination'
 *        400:
 *          description: Something wrong while get list hashtag
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get('/', HashtagsController.get);

/**
 * @swagger
 * /hashtags/{id}:
 *    get:
 *      summary: Get hashtag
 *      description: Get one hâshtag by condition is id
 *      tags: [Hashtags]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *        description: The id of hashtag
 *      responses:
 *        200:
 *          description: The hashtag information
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/HashtagResponse'
 *        400:
 *          description: Something wrong while get hashtag
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get('/:id', ValidatorId, HashtagsController.get);

/**
 * @swagger
 * /hashtags:
 *    post:
 *      summary: Create hashtag
 *      description: Create a hashtag
 *      security:
 *       - BearerAuth: []
 *      tags: [Hashtags]
 *      requestBody:
 *        description: A JSON object containing information of hashtag
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/hashtagRequest'
 *
 *      responses:
 *        200:
 *          description: Status success and information of the created hashtag will be returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/topicResponse'
 *        400:
 *          description: Something wrong while create topic
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.post(
  '/',
  ValidatorBody('hashtag'),
  ValidatorName(hashtagsService, 'hashtag'),
  HashtagsController.create
);

/**
 * @swagger
 * /hashtags:
 *    put:
 *      summary: Update hashtag
 *      description: Update a hashtag
 *      security:
 *       - BearerAuth: []
 *      tags: [Hashtags]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *        description: The id of hashtag
 *      requestBody:
 *        description: A JSON object containing information hashtag
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HashtagRequest'
 *
 *      responses:
 *        200:
 *          description: Status success and information of the updated hashtag will be returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/HashtagResponse'
 *        400:
 *          description: Something wrong while update topic
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('hashtag'),
  ValidatorNameUpdate(hashtagsService, 'hashtag'),
  HashtagsController.update
);

/**
 * @swagger
 * /hashtags/{id}:
 *    delete:
 *      summary: Delete hashtag
 *      description: Delete a hashtag
 *      security:
 *       - BearerAuth: []
 *      tags: [Hashtags]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *        example: 9258d09d-e54d-4276-8146-1738a9b8a718
 *        description: The id of hashtag to update
 *      responses:
 *        200:
 *          description: Status success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    type: number
 *                    description: The number of items to be deleted
 *        400:
 *          description: Something wrong while delete hashtag
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.delete('/:id', ValidatorId, HashtagsController.delete);

export default router;
