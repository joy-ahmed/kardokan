import { Router } from 'express';
import { register, login, logout, getDashboard } from '../controllers/authController';
import { ensureAuthenticated } from '../middleware/authMiddleware';


const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/dashboard', ensureAuthenticated, getDashboard);

export default router;
