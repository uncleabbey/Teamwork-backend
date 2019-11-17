/* eslint-disable no-console */
import db from '../query/db';

const query = `
INSERT INTO gif_comments (gif_Id, author_Id, comment)
VALUES ($1, $2, $3)
RETURNING comment_Id, comment, created_on, gif_Id, author_Id
`;
const getGifCommentQuery = `
SELECT comment_id, comment, author_id
FROM gif_comments
WHERE gif_Id = $1;
`;
export default {
  seedGifs: (gifId, authorId, comment) => {
    return new Promise((resolve, reject) => {
      return db
        .one(query, [gifId, authorId, comment])
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getCommentbyAId: gifId => {
    return new Promise((resolve, reject) => {
      return db
        .manyOrNone(getGifCommentQuery, [gifId])
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
};
