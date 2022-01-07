import {Response, Request, Router} from 'express';

const router=Router()

router.get('/', (req: Request, res: Response) => {
	res.send('OK');
});

router.post('/Authentication', async (req: Request, res: Response) => {
	
});

export default router;