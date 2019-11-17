import { Router } from 'express';
import { verifyToken } from '../../middlewares/jwtToken';
import createArticleComment from '../../controllers/comment';
import validator from '../../middlewares/validateSchema';
import createGifsComment from '../../controllers/gifComment';

const { commentValidator } = validator;
const router = Router();
router.post(
  '/articles/:articleId/comment',
  verifyToken,
  commentValidator,
  createArticleComment
);
router.post(
  '/gifs/:gifId/comment',
  verifyToken,
  commentValidator,
  createGifsComment
);

export default router;
