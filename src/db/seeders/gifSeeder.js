import gifJson from './gifs.json';
import gifs from '../models/gif';

export default {
  seed: async () => {
    try {
      await Promise.all(
        gifJson.map(({ title, imgUrl, userId, type }) =>
          gifs.seedGifs(title, imgUrl, userId, type)
        )
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
