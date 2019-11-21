import flagJson from './flagged.json';
import flag from '../models/flagged';

export default {
  seed: async () => {
    try {
      await Promise.all(
        flagJson.map(({ userId, type, id }) =>
          flag.seedFlags(userId, type, id)
        )
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
