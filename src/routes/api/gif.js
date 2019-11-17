import { Router } from 'express';
import { verifyToken } from '../../middlewares/jwtToken';
import ctrl from '../../controllers/gif';
import parser from '../../utils/multerConfig';
import validators from '../../middlewares/validateSchema';
import extractUrl from '../../middlewares/extractUrl';

const { gifValidator } = validators;
const { gifsCtrl, getGifById, deleteGifbyId } = ctrl;

const router = Router();

router.post(
  '/gifs',
  verifyToken,
  parser.single('imageUrl'),
  extractUrl,
  gifValidator,
  gifsCtrl
);
router.get('/gifs/:gifId', verifyToken, getGifById);
router.delete('/gifs/:gifId', verifyToken, deleteGifbyId);
export default router;
