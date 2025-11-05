import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { testConnection } from '@/config/database';
import { setupSwagger } from '@/config/swagger';
import { errorHandler, notFound } from '@/middlewares/errorHandler';
import { ResponseUtil } from '@/utils/response';

// Import routes
import authRoutes from '@/routes/authRoutes';
import referenceRoutes from '@/routes/referenceRoutes';
import userRoutes from '@/routes/userRoutes';
import companyRoutes from '@/routes/companyRoutes';
import jobRoutes from '@/routes/jobRoutes';

// Load environment variables
dotenv.config();

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '5000');
    
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());
    
    // CORS configuration
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    }));

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Logging middleware
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  private initializeRoutes(): void {
    const apiPrefix = process.env.API_PREFIX || '/api';

    // Setup Swagger documentation
    setupSwagger(this.app);

    // Health check route
    this.app.get(`${apiPrefix}/health`, (req, res) => {
      ResponseUtil.success(res, {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: 'Connected',
      }, 'Server đang hoạt động bình thường');
    });

    // API routes
    this.app.use(apiPrefix, authRoutes);
    this.app.use(apiPrefix, referenceRoutes);
    this.app.use(apiPrefix, userRoutes);
    this.app.use(apiPrefix, companyRoutes);
    this.app.use(apiPrefix, jobRoutes);

    // Test route
    this.app.get(`${apiPrefix}/test`, (req, res) => {
      ResponseUtil.success(res, {
        message: 'API Jobify hoạt động thành công!',
        version: '1.0.0',
        swagger: `http://localhost:${this.port}/api-docs`,
        features: [
          'Authentication JWT',
          'Clean Architecture',
          'TypeScript',
          'MySQL Database',
          'Swagger Documentation',
          'Reference Data APIs',
        ],
      }, 'Test API thành công');
    });
  }

  private initializeErrorHandling(): void {
    // Handle 404 routes
    this.app.use(notFound);
    
    // Global error handler
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Test database connection
      await testConnection();
      
      // Start server
      this.app.listen(this.port, () => {
        console.log('🚀================================🚀');
        console.log(`🌟 Server Jobify đang chạy!`);
        console.log(`📍 URL: http://localhost:${this.port}`);
        console.log(`🌐 API: http://localhost:${this.port}${process.env.API_PREFIX || '/api'}`);
        console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log('🚀================================🚀');
      });
    } catch (error) {
      console.error('❌ Lỗi khởi động server:', error);
      process.exit(1);
    }
  }
}

// Khởi động server
const server = new Server();
server.start().catch((error) => {
  console.error('💥 Server startup failed:', error);
  process.exit(1);
});
