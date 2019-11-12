/* eslint-disable no-console */
import user from './create-user';

const migrateUp = async () => {
  try {
    await user.up();
    console.log('Succesfully Created Table');
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

migrateUp();
