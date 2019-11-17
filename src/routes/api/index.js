import express from 'express';
import user from './user';
import article from './article';
import comment from './comment';
import gif from './gif';

const router = express.Router();

router.use('/auth', user);
router.use('/', article);
router.use('/', comment);
router.use('/', gif);

export default router;
