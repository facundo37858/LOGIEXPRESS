import {Response, Request, Router} from 'express';
import { User } from '../models/User';
const router=Router()

router.get('/', (req: Request, res: Response) => {
	res.send('OK');
});

router.post('/profile', async (req: Request, res: Response) => {
	
	const {  id, identification, zone, phone, photo, account} = req.body
  
	let profile = await User.findOne({where:{id:id}} )


	
});
