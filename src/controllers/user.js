import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import findByEmail from '../services/user';

const logIn = (req, res) => {
  const { email, password } = req.body;
  findByEmail(email)
    // eslint-disable-next-line consistent-return
    .then(user => {
      if (!user) {
        return res.status(404).json({
          error: new Error('User not found')
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              status: 'Error',
              error: 'Incorrect Password'
            });
          }
          const token = jwt.sign(
            {
              userId: user.user_id,
              isAdmin: user.is_admin
            },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
          );
          return res.status(200).json({
            message: 'Succesfully Logged in User',
            status: 'Success',
            data: {
              userId: user.user_id,
              isAdmin: user.is_admin,
              token
            }
          });
        })
        .catch(error => {
          return res.status(500).json({
            status: 'Error',
            error: error.message
          });
        });
    })
    .catch(error => {
      return res.status(500).json({
        status: 'Error',
        error: error.message
      });
    });
};

export default logIn;
