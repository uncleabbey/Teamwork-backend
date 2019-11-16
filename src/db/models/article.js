/* eslint-disable no-console */
import db from '../query/db';

const query = `
INSERT INTO articles (title, article, user_id)
VALUES ($1, $2, $3)
RETURNING article_id AS articleId, title, article, user_id, created_on;
`;
const oneArticlesQuery = `
SELECT u.first_name AS firstName, u.last_name AS lastName, a.article_id AS articleId, 
a.title, a.article, a.created_on AS createdOn
from articles a 
inner join users u ON a.user_id = u.id
where a.article_id = $1;
`;
const updateArticleQuery = `
UPDATE articles SET title=$1, article=$2 
WHERE article_id=$3
RETURNING title, article;
`;

export default {
  seedArticles: (title, article, userId) => {
    return new Promise((resolve, reject) => {
      return db
        .one(query, [title, article, userId])
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
  getOneArticle: articleId => {
    return new Promise((resolve, reject) => {
      return db
        .one(oneArticlesQuery, [articleId])
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
  updateArticlebyId: (title, article, articleId) => {
    return new Promise((resolve, reject) => {
      return db
        .one(updateArticleQuery, [title, article, articleId])
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
