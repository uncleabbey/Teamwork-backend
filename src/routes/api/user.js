import { Router } from 'express';
import logIn from '../../controllers/user';
import signInValidator from '../../middlewares/SchemaValidation';

const router = Router();
router.post('/login', signInValidator, logIn);

export default router;
