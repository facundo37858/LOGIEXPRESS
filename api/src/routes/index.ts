import {Router} from 'express';
import userRoutes from './user';
import LoginRoutes from './login';
import ProfileRoutes from './profiles';
import review from './review'
import TravelRoutes from './travel';

const router = Router();

router.use('/', userRoutes);
router.use('/', LoginRoutes);
router.use('/', ProfileRoutes);
router.use('/', TravelRoutes);
//router.use('/', UploadDataFake) 



export default router;
