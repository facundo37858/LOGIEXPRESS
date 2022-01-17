import {Router} from 'express';
import userRoutes from './user';
import LoginRoutes from './login';
import ProfileRoutes from './profiles';
import review from './review'
import TravelRoutes from './travel';
import UploadDataFake from './uploadDataFake';

import payments from './payments'

const router = Router();

router.use('/', userRoutes);
router.use('/', LoginRoutes);
router.use('/', ProfileRoutes);
router.use('/', TravelRoutes);
router.use('/', UploadDataFake);
<<<<<<< HEAD
=======
router.use('/', review )
>>>>>>> 4d4497c3e84196390cfb5fdfdf6c6d5203875412
router.use('/',payments);
router.use('/', review);
//router.use('/', UploadDataFake) 



export default router;
