import { Router } from 'express';
import createArticle from '../../controllers/article';
import { verifyToken } from '../../middlewares/jwtToken';
import validator from '../../middlewares/validateSchema';

const { articleValidator } = validator;

const router = Router();
router.post(
  '/articles',
  verifyToken,
  articleValidator,
  createArticle
);

export default router;
