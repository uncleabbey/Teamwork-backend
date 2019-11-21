/* eslint-disable no-console */
import user from './create-user';
import article from './create-article';
import comment from './create-comment';
import gif from './create-gif';
import gifComment from './gif-comments';
import flag from './flaggedTable';

const migrateDown = async () => {
  try {
    await article.down();
    await user.down();
    await comment.down();
    await gif.down();
    await gifComment.down();
    await flag.down();
  } catch (error) {
    console.log(error);
  }
};

migrateDown();
