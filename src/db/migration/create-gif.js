/* eslint-disable no-console */
import db from '../query/db';

export default {
  up: () => {
    const query = `
      CREATE TABLE  gifs(
        gif_Id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        img_url VARCHAR NOT NULL,
        created_on timestamptz NOT NULL DEFAULT now(),
        user_id INTEGER NOT NULL REFERENCES users(Id)
      );
    `;
    return new Promise((resolve, reject) => {
      return db
        .none(query)
        .then(() => {
          console.log('Successfully created Table gifs');
          resolve();
        })
        .catch(err => {
          console.log('Error: ', err);
          reject(err);
        });
    });
  },
  down: () => {
    const query = `DROP TABLE IF EXISTS gifs CASCADE;`;
    return new Promise((resolve, reject) => {
      return db
        .none(query)
        .then(() => {
          console.log('Successfully Dropped Table article');
          resolve();
        })
        .catch(err => {
          console.log('Error: ', err);
          reject(err);
        });
    });
  }
};
