/* eslint-disable no-console */
import db from '../query/db';

const upQuery = `
    CREATE TABLE users (
    Id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    gender VARCHAR(10) NOT NULL,
    job_role VARCHAR(25) NOT NULL,
    department VARCHAR(25) NOT NULL,
    address VARCHAR(255) NOT NULL
  )
  `;
const downQuery = `DROP TABLE IF EXISTS users CASCADE`;
export default {
  up: () => {
    return new Promise((resolve, reject) => {
      db.none(upQuery)
        .then(() => {
          console.log('Succesfully Created Table');
          resolve();
        })
        .catch(error => {
          console.log('Error', error);
          reject();
        });
    });
  },
  down: () => {
    return new Promise((resolve, reject) => {
      db.none(downQuery)
        .then(() => {
          console.log('Succesfully Dropped Table');
          resolve();
        })
        .catch(error => {
          console.log('Error', error);
          reject();
        });
    });
  }
};
