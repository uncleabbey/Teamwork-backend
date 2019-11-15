/* eslint-disable no-console */
import db from '../query/db';

const query = `
INSERT INTO articles (title, article, user_id)
VALUES ($1, $2, $3)
RETURNING article_id AS articleId, title, article, user_id, created_on;
`;

export default {
  seedArticles: (title, article, userId) => {
    return new Promise((resolve, reject) => {
      return db
        .one(query, [title, article, userId])
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
};
