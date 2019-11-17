/* eslint-disable no-console */
import user from './userSeeders';
import article from './articleSeeder';
import comment from './commentSeeders';
import gif from './gifSeeder';

const seeders = async () => {
  try {
    console.log('hello');
    await user.seed();
    await article.seed();
    await comment.seed();
    await gif.seed();
  } catch (error) {
    console.log(error);
  }
};

seeders();
