/* eslint-disable no-console */
import db from '../query/db';

const query = `
INSERT INTO gifs (title, img_url, user_id, type)
VALUES ($1, $2, $3, $4)
RETURNING gif_Id AS gifId, title, img_url AS imageUrl, user_id AS userId, created_on;
`;
const getGifbyIdQuery = `
SELECT * from gifs WHERE gif_Id = $1;
`;
const deleteGifQuery = `
DELETE FROM gifs  WHERE gif_id = $1;
`;
export default {
  seedGifs: (title, imgUrl, userId, type) => {
    return new Promise((resolve, reject) => {
      return db
        .one(query, [title, imgUrl, userId, type])
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
  },
  deleteGifbyId: gifId => {
    return new Promise((resolve, reject) => {
      return db
        .none(deleteGifQuery, [gifId])
        .then(() => {
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
};
