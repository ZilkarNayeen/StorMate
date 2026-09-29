import swaggerUi from "swagger-ui-express";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "StorMate Multi-Tenant Inventory & Order API",
    version: "1.0.0",
    description: "Enterprise multi-tenant inventory platform API specification with role-based authorization.",
  },
  servers: [
    {
      url: "http://localhost:5713",
      description: "Local Development Server",
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
  paths: {
    "/api/health": {
      get: {
        summary: "System Health Check",
        responses: {
          "200": {
            description: "Server is healthy",
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "User Authentication",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Login successful with JWT token" },
          "401": { description: "Invalid credentials" },
        },
      },
    },
    "/api/products": {
      get: {
        summary: "Get All Business Products",
        responses: {
          "200": { description: "List of products scoped by tenant" },
        },
      },
    },
    "/api/categories": {
      get: {
        summary: "Get All Business Categories",
        responses: {
          "200": { description: "List of categories" },
        },
      },
    },
    "/api/suppliers": {
      get: {
        summary: "Get All Business Suppliers",
        responses: {
          "200": { description: "List of suppliers" },
        },
      },
    },
    "/api/orders": {
      get: {
        summary: "Get All Business Orders",
        responses: {
          "200": { description: "List of purchase and sales orders" },
        },
      },
    },
  },
};

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Swagger API documentation available at http://localhost:5713/api-docs");
};
