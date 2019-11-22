/* eslint-disable no-console */
import user from './userSeeders';
import article from './articleSeeder';
import comment from './commentSeeders';
import gif from './gifSeeder';
import flag from './flagSeeder';

const seeders = async () => {
  try {
    console.log('hello');
    await user.seed();
    await article.seed();
    await gif.seed();
    await comment.seed();
    await flag.seed();
    console.log('Done with seeding flag');
  } catch (error) {
    console.log(error);
  }
};

seeders();
