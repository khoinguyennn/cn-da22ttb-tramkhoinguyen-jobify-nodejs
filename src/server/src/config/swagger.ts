import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jobify API',
      version: '1.0.0',
      description: 'API Documentation cho hệ thống tìm việc làm Jobify',
      contact: {
        name: 'Jobify Team',
        email: 'support@jobify.vn',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}${process.env.API_PREFIX || '/api'}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Nguyễn Văn A' },
            email: { type: 'string', example: 'user@example.com' },
            phone: { type: 'string', example: '0123456789' },
            idProvince: { type: 'integer', example: 1 },
            avatarPic: { type: 'string', example: 'avatar.jpg' },
            birthDay: { type: 'string', format: 'date', example: '1990-01-01' },
            intro: { type: 'string', example: 'Giới thiệu bản thân' },
            linkSocial: { type: 'string', example: 'https://facebook.com/user' },
            sex: { type: 'string', enum: ['Nam', 'Nữ', 'Khác'], example: 'Nam' },
          },
        },
        Company: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nameCompany: { type: 'string', example: 'Công ty ABC' },
            nameAdmin: { type: 'string', example: 'Nguyễn Văn B' },
            email: { type: 'string', example: 'company@example.com' },
            phone: { type: 'string', example: '0123456789' },
            idProvince: { type: 'integer', example: 1 },
            avatarPic: { type: 'string', example: 'company-logo.jpg' },
            intro: { type: 'string', example: 'Giới thiệu công ty' },
            scale: { type: 'string', example: '100-500 người' },
            web: { type: 'string', example: 'https://company.com' },
          },
        },
        Job: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            idCompany: { type: 'integer', example: 1 },
            idField: { type: 'integer', example: 1 },
            idProvince: { type: 'integer', example: 1 },
            nameJob: { type: 'string', example: 'Lập trình viên React' },
            request: { type: 'string', example: 'Yêu cầu công việc' },
            desc: { type: 'string', example: 'Mô tả công việc' },
            other: { type: 'string', example: 'Thông tin khác' },
            salaryMin: { type: 'integer', example: 10000000 },
            salaryMax: { type: 'integer', example: 20000000 },
            sex: { type: 'string', enum: ['Nam', 'Nữ', 'Không yêu cầu'], example: 'Không yêu cầu' },
            typeWork: { type: 'string', example: 'Toàn thời gian' },
            education: { type: 'string', example: 'Đại học' },
            experience: { type: 'string', example: '2-5 năm' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object' },
            message: { type: 'string', example: 'Thành công' },
            error: { type: 'string', example: 'Lỗi xảy ra' },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                data: { type: 'array', items: {} },
                total: { type: 'integer', example: 100 },
                page: { type: 'integer', example: 1 },
                limit: { type: 'integer', example: 10 },
                totalPages: { type: 'integer', example: 10 },
              },
            },
            message: { type: 'string', example: 'Lấy dữ liệu thành công' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
  ],
};

// Generate Swagger spec
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Setup Swagger UI
export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: `
      .swagger-ui .topbar { 
        background-color: #000000; 
        padding: 10px;
      }
      .swagger-ui .topbar .download-url-wrapper { 
        display: none; 
      }
      .swagger-ui .info .title {
        color: #000000;
        font-size: 2rem;
        font-weight: bold;
      }
      .swagger-ui .info .description {
        color: #374151;
      }
    `,
    customSiteTitle: 'Jobify API Documentation',
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    }
  }));

  // Serve swagger.json
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('📚 Swagger UI đã được setup tại: /api-docs');
};




