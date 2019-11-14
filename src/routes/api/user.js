import { Router } from 'express';
import user from '../../controllers/user';
import validator from '../../middlewares/validateSchema';
import { verifyToken, checkAdmin } from '../../middlewares/jwtToken';

const { signInValidator, createUserValidator } = validator;
const { logIn, createEmp } = user;

const router = Router();
router.post('/login', signInValidator, logIn);
router.post(
  '/create-user',
  verifyToken,
  checkAdmin,
  createUserValidator,
  createEmp
);

export default router;
