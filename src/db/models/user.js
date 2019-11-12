/* eslint-disable no-console */
import db from '../query/db';

const query = `
  INSERT INTO users (email, password, first_name, last_name, is_admin, gender,  job_role, department, address)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING id AS userId, is_admin as isAdmin;
`;
const seedUser = (
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
        resolve();
      })
      .catch(error => {
        console.log(error);
        reject();
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

export default { seedUser, findUserByEmail };
