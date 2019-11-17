import commentModel from '../models/articleComments';
import Gifmodel from '../models/gifComment';
import comments from './articleComments.json';
import gifComments from './gifsComments.json';

export default {
  seed: async () => {
    try {
      await Promise.all(
        comments.map(({ articleId, authorId, comment }) =>
          commentModel.seedArticles(articleId, authorId, comment)
        )
      );
      await Promise.all(
        gifComments.map(({ gifId, authorId, comment }) =>
          Gifmodel.seedGifs(gifId, authorId, comment)
        )
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
