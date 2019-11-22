/* eslint-disable no-console */
import user from './create-user';
import article from './create-article';
import comment from './create-comment';
import gif from './create-gif';
import gifComment from './gif-comments';
import flag from './flaggedTable';

const migrateUp = async () => {
  try {
    await user.up();
    await article.up();
    await comment.up();
    await gif.up();
    await gifComment.up();
    await flag.up();
  } catch (error) {
    console.log(error);
  }
};

migrateUp();
