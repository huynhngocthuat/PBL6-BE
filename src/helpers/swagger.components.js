/**
 * @swagger
 * components:
 *   securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
 *   schemas:
 *     CategoryTopicResponse:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category topic
 *
 *     FileResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id will be get from public id of api upload of api cloudinary
 *         url:
 *           type: string
 *           description: The url will be get from secure_url of api upload of api cloudinary
 *         type:
 *          type: string
 *          description: Type of file (video or image)
 *
 *     CategoryTopicRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category topic
 *       example:
 *         name: "FrontEnd"
 *     Pagination:
 *       type: object
 *       properties:
 *         total_pages:
 *           type: integer
 *           description: Total pages of list data
 *         prev_page:
 *           type: integer
 *           description: Previouse page againts current page, is null if current page is first page
 *         current_page:
 *           type: integer
 *           description: Current page
 *         next_page:
 *           type: integer
 *           description: Next page of current page, is null if current page is maximum
 *         total_count:
 *           type: integer
 *           description: Total items of type data queryj
 *
 *     ErrorBadRequest:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status is failure
 *         error:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Description of the error encountered
 *             code:
 *               type: integer
 *               example: 400
 *               description: HTTP response status codes indicate whether a specific HTTP request has been successfully completed
 *             errors:
 *               type: string
 *               description: Error of request
 *
 */
