import db from '../query/db';

const query = `
  INSERT INTO flagged (flagger, type, id)
  VALUES ($1, $2, $3)
  RETURNING flag_id, flagger, type, id
`;

export default {
  seedFlags: (userId, type, id) => {
    return new Promise((resolve, reject) => {
      return db
        .one(query, [userId, type, id])
        .then(res => resolve(res))
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
          return reject(error);
        });
    });
  }
};
