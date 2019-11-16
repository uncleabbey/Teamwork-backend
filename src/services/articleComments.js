import { errors } from 'pg-promise';
import comments from '../db/models/articleComments';

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

export default createArtComments;
