import express from 'express';
import { CategoryTopicsController } from 'controllers';
import { CategoryTopicsService as categoryTopicService } from 'services';

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
 *   name: Category Topics
 *   description: The category managing API
 */

/**
 * @swagger
 * /category-topics:
 *    get:
 *      summary: Get list category
 *      security:
 *       - BearerAuth: []
 *      tags: [Category Topics]
 *      parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          minimum: 1
 *        required: false
 *        example: 1
 *        description: The number of page to query for category topic
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
 *          description: Status success and information about category
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
 *                      $ref: '#/components/schemas/CategoryTopic'
 *                  pagination:
 *                    $ref: '#/components/schemas/Pagination'
 *        400:
 *          description: Something wrong while get list category topic
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get('/', CategoryTopicsController.get);

/**
 * @swagger
 * /category-topics/{id}:
 *    get:
 *      summary: Get category
 *      description: Get one category by condition is id
 *      security:
 *       - BearerAuth: []
 *      tags: [Category Topics]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *        example: d222c7ae-4e27-4eef-9d6b-1d2839ea4e59
 *        description: The id of category topic
 *      responses:
 *        200:
 *          description: The category information
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/CategoryTopicResponse'
 *        400:
 *          description: Something wrong while get category topic
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.get('/:id', ValidatorId, CategoryTopicsController.get);

/**
 * @swagger
 * /category-topics:
 *    post:
 *      summary: Create category topic
 *      description: Create a new category topic
 *      security:
 *       - BearerAuth: []
 *      tags: [Category Topics]
 *      requestBody:
 *        description: A JSON object containing information of category topics
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryTopicRequest'
 *
 *      responses:
 *        200:
 *          description: Status success and information of the created category topic will be returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/CategoryTopicResponse'
 *        400:
 *          description: Something wrong while create category topic
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.post(
  '/',
  ValidatorBody('categoryTopic'),
  ValidatorName(categoryTopicService, 'categoryTopic'),
  CategoryTopicsController.create
);

/**
 * @swagger
 * /category-topics:
 *    put:
 *      summary: Update category topic
 *      description: Update a category topic
 *      security:
 *       - BearerAuth: []
 *      tags: [Category Topics]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *        description: The id of category topic
 *      requestBody:
 *        description: A JSON object containing category topics
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryTopicRequest'
 *
 *      responses:
 *        200:
 *          description: Status success and information of the updated category topic will be returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    $ref: '#/components/schemas/CategoryTopicResponse'
 *        400:
 *          description: Something wrong while update category topic
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.put(
  '/:id',
  ValidatorId,
  ValidatorBody('categoryTopic'),
  ValidatorNameUpdate(categoryTopicService, 'categoryTopic'),
  CategoryTopicsController.update
);

/**
 * @swagger
 * /category-topics/{id}:
 *    delete:
 *      summary: Delete category topic
 *      description: Delete a category topic
 *      security:
 *       - BearerAuth: []
 *      tags: [Category Topics]
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *        example: 9258d09d-e54d-4276-8146-1738a9b8a718
 *        description: The id of category topic to update
 *      responses:
 *        200:
 *          description: Status success and information of the updated category topic will be returned
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
 *          description: Something wrong while delete category topic
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorBadRequest'
 */
router.delete('/:id', ValidatorId, CategoryTopicsController.delete);

export default router;
