import {Router} from 'express';
import userRoutes from './user';
import LoginRoutes from './login';
import ProfileRoutes from './profiles';
const router = Router();

router.use('/', userRoutes);
router.use('/', LoginRoutes) 
router.use('/', ProfileRoutes) 


export default router;