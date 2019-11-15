/* eslint-disable no-console */
import user from './userSeeders';
import article from './articleSeeder';

const seeders = async () => {
  try {
    console.log('hello');
    await user.seed();
    await article.seed();
  } catch (error) {
    console.log(error);
  }
};

seeders();
