import { Router } from 'express';
import { verifyToken } from '../../middlewares/jwtToken';
import feedCtrl from '../../controllers/feed';

const router = Router();

router.get('/feed', verifyToken, feedCtrl);
export default router;
