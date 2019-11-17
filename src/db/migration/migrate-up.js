/* eslint-disable no-console */
import user from './create-user';
import article from './create-article';
import comment from './create-comment';
import gif from './create-gif';

const migrateUp = async () => {
  try {
    await user.up();
    await article.up();
    await comment.up();
    await gif.up();
  } catch (error) {
    console.log(error);
  }
};

migrateUp();
