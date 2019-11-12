import promise from 'bluebird';
import dotenv from 'dotenv';
import pg from 'pg-promise';

dotenv.config();

const options = {
  promiseLib: promise
};
const pgp = pg(options);

const connectionSring = process.env.DATABASE_URL;

const db = pgp(connectionSring);

export default db;
