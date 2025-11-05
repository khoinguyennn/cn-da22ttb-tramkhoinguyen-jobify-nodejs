import { Router } from 'express';
import { AuthController } from '@/controllers/authController';
import { authenticate, optionalAuthenticate } from '@/middlewares/auth';

const router = Router();
const authController = new AuthController();

// ===== RESTful AUTH ROUTES =====

/**
 * Authentication Sessions (RESTful approach)
 * POST /auth/users/sessions - User login (create session)
 * POST /auth/companies/sessions - Company login (create session)  
 * DELETE /auth/sessions - Logout (delete session)
 */
router.post('/auth/users/sessions', authController.loginUser);
router.post('/auth/companies/sessions', authController.loginCompany);
router.delete('/auth/sessions', optionalAuthenticate, authController.logout);

/**
 * User Registration (Resource creation)
 * POST /users - Register new user
 */
router.post('/users', authController.registerUser);

/**
 * Company Registration (Resource creation)  
 * POST /companies - Register new company
 */
router.post('/companies', authController.registerCompany);

/**
 * Password Management (Resource update)
 * PUT /users/:id/password - Change user password (RESTful standard)
 * POST /users/:id/password - Change user password (backward compatibility)
 * PUT /companies/:id/password - Change company password (RESTful standard) 
 * POST /companies/:id/password - Change company password (backward compatibility)
 */
router.put('/users/:id/password', authenticate, authController.changeUserPassword);
router.post('/users/:id/password', authenticate, authController.changeUserPassword); // Backward compatibility
router.put('/companies/:id/password', authenticate, authController.changeCompanyPassword);
router.post('/companies/:id/password', authenticate, authController.changeCompanyPassword); // Backward compatibility

// TODO: Implement password reset (RESTful approach)
// POST /auth/password/reset - Request password reset
// PUT /auth/password/reset/:token - Reset password with token

export default router;



