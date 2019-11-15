/* eslint-disable no-console */
import user from './create-user';
import article from './create-article';

const migrateUp = async () => {
  try {
    await user.up();
    await article.up();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

migrateUp();
