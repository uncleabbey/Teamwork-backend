import articlesJson from './articles.json';
import articles from '../models/article';

export default {
  seed: async () => {
    try {
      await Promise.all(
        articlesJson.map(({ title, article, userId, tag, type }) =>
          articles.seedArticles(title, article, userId, tag, type)
        )
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
