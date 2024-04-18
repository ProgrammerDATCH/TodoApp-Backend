import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TodoApp Backend API',
      version: '1.0.0',
      description: 'Documentation for Todo Backend API',
    },
    servers: [
      {
        url: 'http://localhost:9090/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

const swaggerSetup = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerSetup;