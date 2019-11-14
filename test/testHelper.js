import dotenv from 'dotenv';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../src/index';

dotenv.config();
chai.use(chaiHttp);
const { expect } = chai;
chai.should();

const generateToken = ({ userId, isAdmin }) => {
  const token = jwt.sign(
    {
      userId,
      isAdmin
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '7 days'
    }
  );
  return token;
};
const validUser = {
  id: '0c4a47ca-bacc-4d55-b679-79d74402b00b',
  isAdmin: true
};
const invalidUser = {
  id: '8',
  isAdmin: true
};

const nonAdmin = {
  id: 'fa6b41c0-6281-4e13-bd42-869f14e94708',
  isAdmin: false
};
export {
  chai,
  app,
  expect,
  generateToken,
  validUser,
  invalidUser,
  nonAdmin
};
