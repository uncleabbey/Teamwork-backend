/* eslint-disable no-console */
import db from '../query/db';

export default {
  up: () => {
    const query = `
    CREATE TABLE  articles(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      article TEXT NOT NULL,
      created_on timestamptz NOT NULL DEFAULT now(),
      user_id INTEGER NOT NULL REFERENCES users(Id),
      tags TEXT []
    );
  `;
    return new Promise((resolve, reject) => {
      return db
        .none(query)
        .then(() => {
          console.log('Successfully created Table article');
          resolve();
        })
        .catch(err => {
          console.log('Error: ', err);
          reject(err);
        });
    });
  },
  down: () => {
    const query = `DROP TABLE IF EXISTS articles CASCADE;`;
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
