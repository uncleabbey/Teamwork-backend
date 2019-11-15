/* eslint-disable no-console */
import user from './create-user';
import article from './create-article';

const migrateDown = async () => {
  try {
    await article.down();
    await user.down();
    console.log('Succesfully Dropped Table');
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

migrateDown();
