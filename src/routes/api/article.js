import { Router } from 'express';
import articles from '../../controllers/article';
import { verifyToken } from '../../middlewares/jwtToken';
import validator from '../../middlewares/validateSchema';

const { articleValidator } = validator;
const { createArticle, getArticlebyId, updateArticlebyId } = articles;

const router = Router();
router.post(
  '/articles',
  verifyToken,
  articleValidator,
  createArticle
);
router.get('/articles/:articleId', verifyToken, getArticlebyId);
router.patch(
  '/articles/:articleId',
  verifyToken,
  articleValidator,
  updateArticlebyId
);

export default router;
