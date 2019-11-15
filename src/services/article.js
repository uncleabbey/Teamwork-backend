/* eslint-disable no-console */
import { errors } from 'pg-promise';
import articleModel from '../db/models/article';

const createArticle = (title, article, userId) => {
  return new Promise((resolve, reject) => {
    articleModel
      .seedArticles(title, article, userId)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        console.log(error);
        if (error instanceof errors.QueryResultError) {
          return reject(new Error('User not found'));
        }
        return reject(error);
      });
  });
};

export default createArticle;