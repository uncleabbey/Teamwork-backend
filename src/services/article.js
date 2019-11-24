/* eslint-disable no-console */
import { errors } from 'pg-promise';
import articleModel from '../db/models/article';

const createArticles = (title, article, userId, tags, type) => {
  return new Promise((resolve, reject) => {
    articleModel
      .seedArticles(title, article, userId, tags, type)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        console.log(error);
        if (error instanceof errors.QueryResultError) {
          return reject(new Error('User not found in the database'));
        }
        return reject(error);
      });
  });
};

const getOneArticle = articleId => {
  return new Promise((resolve, reject) => {
    articleModel
      .getOneArticle(articleId)
      .then(res => resolve(res))
      .catch(error => {
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
const updateArticle = (title, article, tags, articleId) => {
  return new Promise((resolve, reject) => {
    articleModel
      .updateArticlebyId(title, article, tags, articleId)
      .then(res => resolve(res))
      .catch(error => {
        console.log('Service', error);
        if (error instanceof errors.QueryResultError) {
          return reject(
            new Error('Article not found in the database')
          );
        }
        return reject(error);
      });
  });
};
const deleteArticle = articleId => {
  return new Promise((resolve, reject) => {
    articleModel
      .deleteArticlebyId(articleId)
      .then(() => resolve())
      .catch(error => {
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
export default {
  createArticles,
  getOneArticle,
  updateArticle,
  deleteArticle
};
