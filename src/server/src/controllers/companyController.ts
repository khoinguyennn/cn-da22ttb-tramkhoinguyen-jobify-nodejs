import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '@/services/companyService';
import { AuthenticatedRequest } from '@/types';
import { ResponseUtil } from '@/utils/response';
import { catchAsync } from '@/middlewares/errorHandler';

export class CompanyController {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  /**
   * @swagger
   * /companies/{id}:
   *   get:
   *     tags: [Nhà tuyển dụng]
   *     summary: Lấy thông tin công ty theo ID
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của công ty
   *     responses:
   *       200:
   *         description: Lấy thông tin công ty thành công
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/ApiResponse'
   *                 - type: object
   *                   properties:
   *                     data:
   *                       $ref: '#/components/schemas/Company'
   *       401:
   *         description: Chưa xác thực
   *       404:
   *         description: Công ty không tồn tại
   */
  getCompanyById = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const companyId = parseInt(req.params.id);
    
    const company = await this.companyService.getCompanyById(companyId);
    
    ResponseUtil.success(res, company, 'Lấy thông tin công ty thành công');
  });

  /**
   * @swagger
   * /companies/me:
   *   get:
   *     tags: [Nhà tuyển dụng]
   *     summary: Lấy thông tin công ty hiện tại
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lấy thông tin công ty thành công
   *       401:
   *         description: Chưa xác thực
   *       403:
   *         description: Không có quyền truy cập
   */
  getCurrentCompany = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.userType !== 'company') {
      return ResponseUtil.error(res, 'Không có quyền truy cập', 403);
    }

    const company = await this.companyService.getCompanyById(req.user.id);
    
    ResponseUtil.success(res, company, 'Lấy thông tin công ty hiện tại thành công');
  });

  /**
   * @swagger
   * /companies:
   *   get:
   *     tags: [Nhà tuyển dụng]
   *     summary: Lấy danh sách tất cả công ty (có phân trang)
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Số trang
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Số lượng công ty mỗi trang
   *     responses:
   *       200:
   *         description: Lấy danh sách công ty thành công
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PaginatedResponse'
   */
  getAllCompanies = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await this.companyService.getAllCompanies(page, limit);
    
    ResponseUtil.paginated(
      res, 
      result.data, 
      result.total, 
      result.page, 
      result.limit, 
      'Lấy danh sách công ty thành công'
    );
  });

  /**
   * @swagger
   * /companies/{id}:
   *   put:
   *     tags: [Nhà tuyển dụng]
   *     summary: Cập nhật thông tin công ty
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nameCompany:
   *                 type: string
   *                 example: Công ty ABC
   *               nameAdmin:
   *                 type: string
   *                 example: Nguyễn Văn B
   *               email:
   *                 type: string
   *                 example: company@example.com
   *               phone:
   *                 type: string
   *                 example: "0123456789"
   *               idProvince:
   *                 type: integer
   *                 example: 1
   *               web:
   *                 type: string
   *                 example: https://company.com
   *               scale:
   *                 type: string
   *                 example: "100-500 người"
   *     responses:
   *       200:
   *         description: Cập nhật thông tin thành công
   *       401:
   *         description: Chưa xác thực
   *       403:
   *         description: Không có quyền truy cập
   *       409:
   *         description: Email đã được sử dụng
   */
  updateCompany = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.userType !== 'company') {
      return ResponseUtil.error(res, 'Không có quyền truy cập', 403);
    }

    const { nameCompany, nameAdmin, email, phone, idProvince, web, scale } = req.body;
    
    const updatedCompany = await this.companyService.updateCompanyProfile(req.user.id, {
      nameCompany,
      nameAdmin,
      email,
      phone,
      idProvince,
      web,
      scale,
    });

    ResponseUtil.success(res, updatedCompany, 'Cập nhật thông tin công ty thành công');
  });

  /**
   * @swagger
   * /companies/{id}/intro:
   *   put:
   *     tags: [Nhà tuyển dụng]
   *     summary: Cập nhật giới thiệu công ty
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - intro
   *             properties:
   *               intro:
   *                 type: string
   *                 example: Công ty chúng tôi chuyên về phát triển phần mềm...
   *     responses:
   *       200:
   *         description: Cập nhật giới thiệu thành công
   *       401:
   *         description: Chưa xác thực
   *       403:
   *         description: Không có quyền truy cập
   */
  updateCompanyIntro = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.userType !== 'company') {
      return ResponseUtil.error(res, 'Không có quyền truy cập', 403);
    }

    const { intro } = req.body;
    
    if (!intro) {
      return ResponseUtil.error(res, 'Nội dung giới thiệu là bắt buộc', 400);
    }

    await this.companyService.updateCompanyIntro(req.user.id, intro);

    ResponseUtil.success(res, null, 'Cập nhật giới thiệu công ty thành công');
  });

  /**
   * @swagger
   * /companies/{id}/avatar:
   *   put:
   *     tags: [Nhà tuyển dụng]
   *     summary: Cập nhật logo công ty
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - avatarPic
   *             properties:
   *               avatarPic:
   *                 type: string
   *                 example: logo-company-123.jpg
   *     responses:
   *       200:
   *         description: Cập nhật logo công ty thành công
   *       401:
   *         description: Chưa xác thực
   *       403:
   *         description: Không có quyền truy cập
   */
  updateCompanyAvatar = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.userType !== 'company') {
      return ResponseUtil.error(res, 'Không có quyền truy cập', 403);
    }

    const { avatarPic } = req.body;
    
    if (!avatarPic) {
      return ResponseUtil.error(res, 'Tên file logo là bắt buộc', 400);
    }

    await this.companyService.updateCompanyAvatar(req.user.id, avatarPic);

    ResponseUtil.success(res, null, 'Cập nhật logo công ty thành công');
  });
}



