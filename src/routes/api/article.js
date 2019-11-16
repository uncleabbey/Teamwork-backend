import { Router } from 'express';
import articles from '../../controllers/article';
import { verifyToken } from '../../middlewares/jwtToken';
import validator from '../../middlewares/validateSchema';

const { articleValidator } = validator;
const { createArticle, getArticlebyId } = articles;

const router = Router();
router.post(
  '/articles',
  verifyToken,
  articleValidator,
  createArticle
);
router.get('/articles/:id', verifyToken, getArticlebyId);

export default router;
