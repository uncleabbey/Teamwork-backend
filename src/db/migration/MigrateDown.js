/* eslint-disable no-console */
import user from './create-user';

const migrateDown = async () => {
  try {
    await user.down();
    console.log('Succesfully Dropped Table');
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

migrateDown();
