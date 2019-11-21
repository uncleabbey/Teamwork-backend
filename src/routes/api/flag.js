import { Router } from 'express';
import { verifyToken } from '../../middlewares/jwtToken';
import flagCtrl from '../../controllers/flag';

const router = Router();

router.post('/flag', verifyToken, flagCtrl);

export default router;
