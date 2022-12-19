/* eslint-disable import/prefer-default-export */
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

export const swagger = () => {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API docs',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'Development server',
      },
      {
        url: 'https://pbl6.info/api/v1',
        description: 'Product server',
      },
    ],
    schemes:
      process.env.SWAGGER_SCHEMA_HTTPS === 'true'
        ? ['https']
        : ['http', 'https'],
  };

  const options = {
    swaggerDefinition,
    apis: ['./src/routers/*.js', './src/helpers/swagger.components.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  return [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];
};
