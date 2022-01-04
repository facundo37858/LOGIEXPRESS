import {Response, Request, Router} from 'express';

const router=Router()

router.get('/', (req: Request, res: Response) => {
	res.send('soy user get!');
});

router.post('/', (req: Request, res: Response) => {
	res.send('soy user post!');
});

export default router;