import db from '../query/db';

const query = `
SELECT user_id AS authorId, gif_id AS id, created_on, title, img_url AS content
FROM gifs
UNION ALL
SELECT user_id AS authorId, article_id AS id, created_on, title, article  AS content
FROM articles
ORDER BY created_on DESC;
`;

const feed = () => {
  return new Promise((resolve, reject) => {
    return db
      .manyOrNone(query)
      .then(res => {
        return resolve(res);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        reject(err);
      });
  });
};

export default feed;
