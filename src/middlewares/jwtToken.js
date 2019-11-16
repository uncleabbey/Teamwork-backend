import jwt from 'jsonwebtoken';
import models from '../db/models/user';

const { findUserById } = models;
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { userId, isAdmin } = jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    req.decoded = { userId, isAdmin };
    const user = await findUserById(userId);
    if (user.user_id !== userId) {
      return res.status(404).json({
        status: 'Error',
        error: 'User not Found'
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: 'Invalid Request!1'
    });
  }
};

export const checkAdmin = (req, res, next) => {
  try {
    const { isAdmin } = req.decoded;
    if (isAdmin) {
      return next();
    }
    return res.status(401).json({
      status: 'error',
      error: 'Sorry Only Admin can perform this action'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: 'Invalid Request!2'
    });
  }
};
