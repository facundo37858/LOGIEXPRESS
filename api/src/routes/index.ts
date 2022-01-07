import {Router} from 'express';
import userRoutes from './user';
import LoginRoutes from './login';
import ProfileRoutes from './profiles';
const router = Router();

router.use('/user', userRoutes);
router.use('/login', LoginRoutes) 
router.use('/profile', ProfileRoutes) 


export default router;