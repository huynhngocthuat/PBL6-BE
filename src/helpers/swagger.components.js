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
 *     HashtagRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the section topic
 *       example:
 *         name: "mvc"
 *
 *     HashtagResponse:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the hashtag
 *         name:
 *           type: string
 *           description: The name of the hashtag
 *
 *     CourseResponse:
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
 *           description: The name of the course
 *         price:
 *           type: integer
 *           description: The name of the course
 *         thumbnailUrl:
 *           type: string
 *           description: The thumbnailUrl of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         isActived:
 *           type: string
 *           description: The status isActived of the course
 *         userId:
 *           type: string
 *           description: The instructor id of course
 *         categoryTopicId:
 *           type: string
 *           description: The category id of course
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         deletedAt:
 *           type: string
 *
 *     CourseRequest:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - thumbnailUrl
 *         - description
 *         - userId
 *         - categoryTopicId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the course
 *         price:
 *           type: integer
 *           description: The name of the course
 *         thumbnailUrl:
 *           type: string
 *           description: The thumbnailUrl of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         userId:
 *           type: string
 *           description: The instructor id of course
 *         hashtags:
 *           type: array
 *           items:
 *             type: string
 *         categoryTopicId:
 *           type: string
 *           description: The category id of course
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
 *     SectionResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of section
 *         name:
 *           type: string
 *           description: The name of section
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         deletedAt:
 *           type: string
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
