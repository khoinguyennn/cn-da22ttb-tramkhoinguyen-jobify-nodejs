import { Router } from 'express';
import { JobController } from '@/controllers/jobController';
import { authenticate } from '@/middlewares/auth';

const router = Router();
const jobController = new JobController();

// ===== PUBLIC JOB ROUTES =====

/**
 * GET /jobs - Lấy danh sách tất cả jobs (public, có filter)
 * GET /jobs/:id - Lấy chi tiết job (public)
 * GET /jobs/stats - Lấy thống kê jobs (public)
 */
router.get('/jobs/stats', jobController.getJobStats);
router.get('/jobs/:id', jobController.getJobById);
router.get('/jobs', jobController.getAllJobs);

// ===== AUTHENTICATED JOB ROUTES =====

/**
 * POST /jobs - Tạo job mới (chỉ company)
 * PUT /jobs/:id - Cập nhật job (chỉ company owner)
 * DELETE /jobs/:id - Xóa job (chỉ company owner)
 */
router.post('/jobs', authenticate, jobController.createJob);
router.put('/jobs/:id', authenticate, jobController.updateJob);
router.delete('/jobs/:id', authenticate, jobController.deleteJob);

// ===== NESTED RESOURCE ROUTES =====

/**
 * GET /companies/:id/jobs - Lấy danh sách jobs của company
 */
router.get('/companies/:id/jobs', jobController.getJobsByCompany);

export default router;

