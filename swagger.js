// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TODO List API',
      version: '1.0.0',
      description: 'API para gerenciar uma lista de tarefas TODO',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            completed: { type: 'boolean' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
