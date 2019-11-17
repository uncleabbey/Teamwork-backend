/* eslint-disable no-console */
import db from '../query/db';

export default {
  up: () => {
    const query = `
    CREATE TABLE gif_comments(
      comment_Id SERIAL PRIMARY KEY,
      comment VARCHAR NOT NULL,
      created_on timestamptz NOT NULL DEFAULT now(),
      gif_Id INTEGER NOT NULL REFERENCES gifs(gif_Id) ON DELETE CASCADE,
      author_Id INTEGER NOT NULL REFERENCES users(Id)
    );
    `;
    return new Promise((resolve, reject) => {
      return db
        .none(query)
        .then(() => {
          console.log('Successfully created gif comments Table');
          resolve();
        })
        .catch(err => {
          console.log('Error: ', err);
          reject(err);
        });
    });
  },
  down: () => {
    const query = `DROP TABLE IF EXISTS gif_comments CASCADE;`;
    return new Promise((resolve, reject) => {
      return db
        .none(query)
        .then(() => {
          console.log('Successfully Dropped Table gif comments');
          resolve();
        })
        .catch(err => {
          console.log('Error: ', err);
          reject(err);
        });
    });
  }
};
