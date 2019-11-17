/* eslint-disable no-console */
import { errors } from 'pg-promise';
import gifModel from '../db/models/gif';

const createGifs = (title, imgUrl, userId) => {
  return new Promise((resolve, reject) => {
    gifModel
      .seedGifs(title, imgUrl, userId)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        console.log(error);
        if (error instanceof errors.QueryResultError) {
          return reject(
            new Error('Something is wrong with the query')
          );
        }
        return reject(error);
      });
  });
};
const getGif = gifId => {
  return new Promise((resolve, reject) => {
    gifModel
      .getGifById(gifId)
      .then(res => resolve(res))
      .catch(error => {
        console.log(error);
        if (error instanceof errors.QueryResultError) {
          return reject(new Error('Gif not found in the database'));
        }
        return reject(error);
      });
  });
};

export default { createGifs, getGif };
