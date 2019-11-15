import express from 'express';
import user from './user';
import article from './article';

const router = express.Router();

router.use('/auth', user);
router.use('/', article);

export default router;
