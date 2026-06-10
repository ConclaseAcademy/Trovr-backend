const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Campus Marketplace API",
      version: "1.0.0",
      description:
        "Campus Marketplace REST API Documentation",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js",
  ],
};

const swaggerSpec =
  swaggerJsdoc(options);

module.exports = swaggerSpec;