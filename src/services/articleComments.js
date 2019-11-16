import { errors } from 'pg-promise';
import comments from '../db/models/articleComments';
import articles from '../db/models/article';

const createArtComments = (articleId, authorId, comment) => {
  return new Promise((resolve, reject) => {
    comments
      .seedArticles(articleId, authorId, comment)
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

const getArtComments = articleId => {
  return new Promise((resolve, reject) => {
    articles
      .getCommentbyAId(articleId)
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
export default { createArtComments, getArtComments };
