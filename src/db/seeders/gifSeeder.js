import gifJson from './gifs.json';
import gifs from '../models/gif';

export default {
  seed: async () => {
    try {
      await Promise.all(
        gifJson.map(({ title, imgUrl, userId }) =>
          gifs.seedGifs(title, imgUrl, userId)
        )
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
