/* eslint-disable no-console */
import db from '../query/db';

const query = `
INSERT INTO articles (title, article, user_id, tags)
VALUES ($1, $2, $3, $4)
RETURNING article_id AS articleId, title, article, user_id, tags, created_on;
`;
const oneArticlesQuery = `
SELECT u.first_name AS firstName, u.last_name AS lastName, a.article_id AS articleId, 
a.title, a.article, a.created_on AS createdOn
from articles a 
inner join users u ON a.user_id = u.id
where a.article_id = $1;
`;
const getArtCommentQuery = `
SELECT comment_id, comment, author_id
FROM article_comments
WHERE article_id = $1;
`;

const updateArticleQuery = `
UPDATE articles SET title=$1, article=$2, tags=$3 
WHERE article_id=$4
RETURNING title, article;
`;
const deleteArticleQuery = `
DELETE FROM articles  WHERE article_id = $1;
`;

export default {
  seedArticles: (title, article, userId, tags) => {
    return new Promise((resolve, reject) => {
      return db
        .one(query, [title, article, userId, tags.map(tag => tag)])
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
          return resolve(res);
        })
        .catch(err => {
          console.log(err);
          return reject(err);
        });
    });
  },
  updateArticlebyId: (title, article, tags, articleId) => {
    return db.one(updateArticleQuery, [
      title,
      article,
      tags,
      articleId
    ]);
  },
  deleteArticlebyId: articleId => {
    return new Promise((resolve, reject) => {
      return db
        .none(deleteArticleQuery, [articleId])
        .then(() => {
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getCommentbyAId: articleId => {
    return new Promise((resolve, reject) => {
      return db
        .manyOrNone(getArtCommentQuery, [articleId])
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  searchByTags: tags => {
    const searchQuery = `
      SELECT * FROM articles WHERE $1 = any(tags);
    `;
    return db.manyOrNone(searchQuery, [tags]);
  }
};
