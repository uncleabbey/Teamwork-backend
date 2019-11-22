/* eslint-disable no-console */
import db from '../query/db';

export default {
  up: async () => {
    const query = `
      CREATE TYPE flag_type_method AS ENUM (
        'article',
        'gif',
        'comment'
      );
      CREATE TABLE flagged (
        flag_id SERIAL PRIMARY KEY,
        flagger INTEGER NOT NULL REFERENCES users(Id),
        type flag_type_method,
        id INTEGER NOT NULL
      );
    `;
    try {
      await db.none(query);
      console.log('Flagged Table Created');
    } catch (error) {
      console.log(error);
    }
  },
  down: async () => {
    const query = `
    DROP TYPE IF EXISTS flag_type_method CASCADE;
    DROP TABLE IF EXISTS flagged CASCADE;
    `;
    try {
      await db.none(query);
      console.log('Flagged Table Dropped Successfully');
    } catch (error) {
      console.log(error);
    }
  }
};
