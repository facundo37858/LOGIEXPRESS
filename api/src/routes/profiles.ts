import {Response, Request, Router,NextFunction} from 'express';
import { User } from '../models/User';

import { uuid } from 'uuidv4';
import { Carrier } from '../models/Carrier';

const router=Router()


router.post('/userProfile', async (req: Request, res: Response, next: NextFunction) => {
	// res.send('llega al user profile')
	const {  id, identification, zone, phone, photo, account} = req.body
	
	let newProfile = { 
		id: uuid(),
		identification:identification,
		zone:zone,
		phone:phone,
        photo:photo,
        account:account
	}
	
    User.create(newProfile)
    .then(newProfile => {
		res.send(newProfile);
	})
	.catch(error => next(error))
});

router.post('/carrierProfile', async (req: Request, res: Response, next: NextFunction) => {
	// res.send('llega al carrier profile')
	const {  id, documentID, license, email, phone, location, CBU} = req.body
	
	let newProfile = { 
		id: uuid(),
		documentID:documentID,
		license:license,
		email:email,
		phone:phone,
        location:location,
        CBU:CBU
	}
	
    Carrier.create(newProfile)
    .then(newProfile => {
		res.send(newProfile);
	})
	.catch(error => next(error))
});

router.get('/profile', async (req: Request, res: Response) => {
	// res.send('llega al  profile')
	const {id} = req.params;

	const user = await User.findByPk(id)

	if(user === null){
		const carrier = await Carrier.findByPk(id);

		return carrier ? res.json(carrier) : res.status(404).send("ID Not Found")
	}

	return user ? res.json(user) : res.status(404).send("ID Not Found")
});

router.put('/edit', async (req: Request, res: Response, next: NextFunction)=>{


})

router.delete('/delete', async (req: Request, res: Response, next: NextFunction)=>{
	

})

export default router;