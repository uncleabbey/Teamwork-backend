/* eslint-disable no-console */
import { errors } from 'pg-promise';
import gifModel from '../db/models/gif';

const createGifs = (title, imgUrl, userId, type) => {
  return new Promise((resolve, reject) => {
    gifModel
      .seedGifs(title, imgUrl, userId, type)
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
const deleteGif = gifId => {
  return new Promise((resolve, reject) => {
    gifModel
      .deleteGifbyId(gifId)
      .then(() => resolve())
      .catch(error => {
        console.log(error);
        if (error instanceof errors.QueryResultError) {
          return reject(new Error('gif not found in the database'));
        }
        return reject(error);
      });
  });
};

export default { createGifs, getGif, deleteGif };
