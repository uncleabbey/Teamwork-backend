import { Router } from 'express';
import { verifyToken } from '../../middlewares/jwtToken';
import gifsCtrl from '../../controllers/gif';
import parser from '../../utils/multerConfig';
import validators from '../../middlewares/validateSchema';
import extractUrl from '../../middlewares/extractUrl';

const { gifValidator } = validators;

const router = Router();

router.post(
  '/gifs',
  verifyToken,
  parser.single('imageUrl'),
  extractUrl,
  gifValidator,
  gifsCtrl
);
export default router;
