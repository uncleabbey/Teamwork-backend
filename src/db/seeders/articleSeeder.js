import articlesJson from './articles.json';
import articles from '../models/article';

export default {
  seed: async () => {
    try {
      await Promise.all(
        articlesJson.map(({ title, article, userId }) =>
          articles.seedArticles(title, article, userId)
        )
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
