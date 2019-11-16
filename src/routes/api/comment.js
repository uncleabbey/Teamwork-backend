import { Router } from 'express';
import { verifyToken } from '../../middlewares/jwtToken';
import createArticleComment from '../../controllers/comment';
import validator from '../../middlewares/validateSchema';

const { commentValidator } = validator;
const router = Router();
router.post(
  '/articles/:articleId/comment',
  verifyToken,
  commentValidator,
  createArticleComment
);

export default router;
