import {Router} from 'express';
import userRoutes from './user';
import LoginRoutes from './login';
import ProfileRoutes from './profiles';
import TravelRoutes from './travel';
import uploadDataFake from './uploadDataFake';
const router = Router();

router.use('/', userRoutes);
router.use('/', LoginRoutes) 
router.use('/', ProfileRoutes) 
router.use('/', TravelRoutes) 
router.use('/', uploadDataFake) 


export default router;