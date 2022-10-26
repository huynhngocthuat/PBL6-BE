/* eslint-disable import/prefer-default-export */
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

export const swagger = () => {
  const swaggerDefinition = {
    info: {
      title: 'API docs',
      version: '1.0.0',
    },
    basePath: '/api/v1',
    schemes:
      process.env.SWAGGER_SCHEMA_HTTPS === 'true'
        ? ['https']
        : ['http', 'https'],
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  };

  const options = {
    swaggerDefinition,
    apis: ['src/routers/*.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  return [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];
};
