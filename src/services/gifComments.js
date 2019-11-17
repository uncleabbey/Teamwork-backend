import { errors } from 'pg-promise';
import comments from '../db/models/gifComment';

const createGifComments = (gifId, authorId, comment) => {
  return new Promise((resolve, reject) => {
    comments
      .seedGifs(gifId, authorId, comment)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
        if (error instanceof errors.QueryResultError) {
          return reject(new Error('User not found in the database'));
        }
        return reject(error);
      });
  });
};
const getGifComments = gifId => {
  return new Promise((resolve, reject) => {
    comments
      .getCommentbyAId(gifId)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
        if (error instanceof errors.QueryResultError) {
          return reject(
            new Error('Article not found in the database')
          );
        }
        return reject(error);
      });
  });
};

export default { createGifComments, getGifComments };
