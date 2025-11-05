import { Request, Response, NextFunction } from 'express';
import { ReferenceService } from '@/services/referenceService';
import { ResponseUtil } from '@/utils/response';
import { catchAsync } from '@/middlewares/errorHandler';

export class ReferenceController {
  private referenceService: ReferenceService;

  constructor() {
    this.referenceService = new ReferenceService();
  }

  // ===== PROVINCES =====

  /**
   * @swagger
   * /provinces:
   *   get:
   *     tags: [Tỉnh]
   *     summary: Lấy danh sách tất cả tỉnh thành
   *     responses:
   *       200:
   *         description: Lấy danh sách tỉnh thành thành công
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ApiResponse'
   */
  getAllProvinces = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const provinces = await this.referenceService.getAllProvinces();
    ResponseUtil.success(res, provinces, 'Lấy danh sách tỉnh thành thành công');
  });

  /**
   * @swagger
   * /provinces/type:
   *   get:
   *     tags: [Tỉnh]
   *     summary: Lấy danh sách tỉnh thành có phân loại
   *     responses:
   *       200:
   *         description: Lấy danh sách tỉnh thành thành công
   */
  getProvincesWithType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const provinces = await this.referenceService.getAllProvinces();
    
    // Group provinces by type (có thể customize logic này)
    const provincesWithType = {
      municipalities: provinces.filter(p => p.nameWithType.includes('Thành phố')),
      provinces: provinces.filter(p => p.nameWithType.includes('Tỉnh')),
    };
    
    ResponseUtil.success(res, provincesWithType, 'Lấy danh sách tỉnh thành theo loại thành công');
  });

  // ===== FIELDS =====

  /**
   * @swagger
   * /fields:
   *   get:
   *     tags: [Ngành nghề]
   *     summary: Lấy danh sách tất cả ngành nghề
   *     responses:
   *       200:
   *         description: Lấy danh sách ngành nghề thành công
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ApiResponse'
   */
  getAllFields = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const fields = await this.referenceService.getAllFields();
    ResponseUtil.success(res, fields, 'Lấy danh sách ngành nghề thành công');
  });

  /**
   * @swagger
   * /fields/type:
   *   get:
   *     tags: [Ngành nghề]
   *     summary: Lấy danh sách ngành nghề theo loại
   *     responses:
   *       200:
   *         description: Lấy danh sách ngành nghề theo loại thành công
   */
  getFieldsByType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const fieldTypes = await this.referenceService.getUniqueFieldTypes();
    
    const fieldsByType: { [key: string]: any[] } = {};
    
    for (const type of fieldTypes) {
      fieldsByType[type] = await this.referenceService.getFieldsByType(type);
    }
    
    ResponseUtil.success(res, fieldsByType, 'Lấy danh sách ngành nghề theo loại thành công');
  });
}



