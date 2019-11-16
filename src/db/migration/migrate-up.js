/* eslint-disable no-console */
import user from './create-user';
import article from './create-article';
import comment from './create-comment';

const migrateUp = async () => {
  try {
    await user.up();
    await article.up();
    await comment.up();
  } catch (error) {
    console.log(error);
  }
};

migrateUp();
