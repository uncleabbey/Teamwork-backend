import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userService from '../services/user';

const { findByEmail, createUser } = userService;

const generateToken = ({ userId, isAdmin, email }) => {
  const token = jwt.sign(
    {
      userId,
      isAdmin,
      email
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '7 days'
    }
  );
  return token;
};
const hashString = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const createEmp = (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    isAdmin,
    gender,
    jobRole,
    department,
    address
  } = req.body;
  createUser(
    email,
    hashString(password),
    firstName,
    lastName,
    isAdmin,
    gender,
    jobRole,
    department,
    address
  )
    .then(user => {
      res.status(200).json({
        message: 'Succesfully Created in User',
        status: 'success',
        data: {
          message: 'User account successfully created',
          userId: user.userid,
          isAdmin: user.isadmin,
          token: generateToken({
            userId: user.userid,
            isAdmin: user.isadmin,
            email: user.email
          })
        }
      });
    })
    .catch(error => {
      res.status(400).json({
        status: 'error',
        error: error.message
      });
    });
};

const logIn = (req, res) => {
  const { email, password } = req.body;
  findByEmail(email)
    // eslint-disable-next-line consistent-return
    .then(user => {
      if (!user) {
        return res.status(404).json({
          status: 'error',
          error: new Error('User not found')
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              status: 'error',
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
            status: 'success',
            data: {
              message: 'Succesfully Logged in User',
              userId: user.user_id,
              isAdmin: user.is_admin,
              token
            }
          });
        })
        .catch(error => {
          return res.status(500).json({
            status: 'error',
            error: error.message
          });
        });
    })
    .catch(error => {
      return res.status(500).json({
        status: 'error',
        error: error.message
      });
    });
};

export default { logIn, createEmp };
