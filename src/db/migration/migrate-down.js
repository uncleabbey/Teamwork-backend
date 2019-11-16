/* eslint-disable no-console */
import user from './create-user';
import article from './create-article';
import comment from './create-comment';

const migrateDown = async () => {
  try {
    await article.down();
    await user.down();
    await comment.down();
    console.log('Succesfully Dropped Table');
  } catch (error) {
    console.log(error);
  }
};

migrateDown();
