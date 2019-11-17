/* eslint-disable no-console */
import db from '../query/db';

const query = `
INSERT INTO gifs (title, img_url, user_id)
VALUES ($1, $2, $3)
RETURNING gif_Id AS gifId, title, img_url AS imageUrl, user_id AS userId, created_on;
`;
const getGifbyIdQuery = `
SELECT * from gifs WHERE gif_Id = $1;
`;
export default {
  seedGifs: (title, imgUrl, userId) => {
    return new Promise((resolve, reject) => {
      return db
        .one(query, [title, imgUrl, userId])
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
  getGifById: gifId => {
    return new Promise((resolve, reject) => {
      return db
        .one(getGifbyIdQuery, [gifId])
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
