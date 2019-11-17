/* eslint-disable no-console */
import user from './create-user';
import article from './create-article';
import comment from './create-comment';
import gif from './create-gif';

const migrateDown = async () => {
  try {
    await article.down();
    await user.down();
    await comment.down();
    await gif.down();
    console.log('Succesfully Dropped Table');
  } catch (error) {
    console.log(error);
  }
};

migrateDown();
