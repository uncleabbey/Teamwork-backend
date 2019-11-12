/* eslint-disable no-console */
import { errors } from 'pg-promise';
import User from '../db/models/user';

const { findUserByEmail } = User;

const findByEmail = email => {
  return new Promise((resolve, reject) => {
    findUserByEmail(email)
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(error => {
        console.log(error);
        if (error instanceof errors.QueryResultError) {
          return reject(new Error('User not found'));
        }
        return reject(error);
      });
  });
};
export default findByEmail;
