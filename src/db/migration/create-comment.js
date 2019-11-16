/* eslint-disable no-console */
import db from '../query/db';

export default {
  up: () => {
    const query = `
    CREATE TABLE article_comments(
      comment_Id SERIAL PRIMARY KEY,
      comment VARCHAR NOT NULL,
      created_on timestamptz NOT NULL DEFAULT now(),
      article_Id INTEGER NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
      author_Id INTEGER NOT NULL REFERENCES users(Id)
    );
    `;
    return new Promise((resolve, reject) => {
      return db
        .none(query)
        .then(() => {
          console.log('Successfully created article comments Table');
          resolve();
        })
        .catch(err => {
          console.log('Error: ', err);
          reject(err);
        });
    });
  },
  down: () => {
    const query = `DROP TABLE IF EXISTS article_comments CASCADE;`;
    return new Promise((resolve, reject) => {
      return db
        .none(query)
        .then(() => {
          console.log('Successfully Dropped Table article comments');
          resolve();
        })
        .catch(err => {
          console.log('Error: ', err);
          reject(err);
        });
    });
  }
};
