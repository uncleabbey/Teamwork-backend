import jwt from 'jsonwebtoken';

export default class Token {
  static generateToken({
    email,
    is_admin: isAdmin,
    user_id: userId
  }) {
    return jwt.sign(
      { email, isAdmin, userId },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );
  }

  static verifyToken(req, res, next) {
    try {
      const decodedToken = jwt.verify(
        req.body.token,
        process.env.SECRET_KEY
      );
      const { isAdmin, userId } = decodedToken;
      req.body.is_admin = isAdmin;
      req.body.user_id = userId;

      next();
    } catch (error) {
      let message = 'Aunthentication error';
      if (error instanceof jwt.JsonWebTokenError) {
        message = 'Authentication Error: Token has expired';
      }
      res.status(401).json({
        message,
        error
      });
    }
  }
}
