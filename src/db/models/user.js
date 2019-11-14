/* eslint-disable no-console */
import db from '../query/db';
import uuid from '../../utils/helper';

const query = `
  INSERT INTO users (id, email, password, first_name, last_name, is_admin, gender,  job_role, department, address)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING id AS userId, is_admin as isAdmin;
`;
const seedUser = (
  id,
  email,
  password,
  firstName,
  lastName,
  isAdmin,
  gender,
  jobRole,
  department,
  address
) => {
  return new Promise((resolve, reject) => {
    db.one(query, [
      id,
      email,
      password,
      firstName,
      lastName,
      isAdmin,
      gender,
      jobRole,
      department,
      address
    ])
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const findUserByEmail = email => {
  const emailQuery = `
  SELECT id AS user_id, email, first_name, last_name, password, is_admin 
    FROM users WHERE email = $1;
  `;
  return db.one(emailQuery, [email]);
};

const findUserById = id => {
  const userQuery = `
  SELECT id AS user_id, email, first_name, last_name, password, is_admin, job_role, gender, department, address  
    FROM users WHERE id = $1; 
  `;
  return new Promise((resolve, reject) => {
    return db
      .one(userQuery, [id])
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
const createEmp = (
  email,
  password,
  firstName,
  lastName,
  isAdmin,
  gender,
  jobRole,
  department,
  address
) => {
  return new Promise((resolve, reject) => {
    return db
      .one(query, [
        uuid(),
        email,
        password,
        firstName,
        lastName,
        isAdmin,
        gender,
        jobRole,
        department,
        address
      ])
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
export default {
  seedUser,
  findUserByEmail,
  findUserById,
  createEmp
};
