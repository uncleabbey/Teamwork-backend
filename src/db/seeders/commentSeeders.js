import commentModel from '../models/articleComments';
import comments from './articleComments.json';

export default {
  seed: async () => {
    try {
      await Promise.all(
        comments.map(({ articleId, authorId, comment }) =>
          commentModel.seedArticles(articleId, authorId, comment)
        )
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
