import {Router} from 'express';
import userRoutes from './user';
import LoginRoutes from './login';
const router = Router();

router.use('/user', userRoutes);
router.use('/login', LoginRoutes) 

export default router;