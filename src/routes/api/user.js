import { Router } from 'express';
import users from '../../controllers/user';
import validator from '../../middlewares/validateSchema';
import { verifyToken, checkAdmin } from '../../middlewares/jwtToken';

const { signInValidator, createUserValidator } = validator;
const { logIn, createEmp } = users;

const router = Router();
router.post('/signin', signInValidator, logIn);
router.post(
  '/create-user',
  verifyToken,
  checkAdmin,
  createUserValidator,
  createEmp
);

export default router;
