/* eslint-disable no-console */
import db from '../query/db';

const query = `
INSERT INTO article_comments (article_Id, author_Id, comment)
VALUES ($1, $2, $3)
RETURNING comment_Id, comment, created_on, article_Id, author_Id
`;

export default {
  seedArticles: (articleId, authorId, comment) => {
    return new Promise((resolve, reject) => {
      return db
        .one(query, [articleId, authorId, comment])
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
