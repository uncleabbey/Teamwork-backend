/* eslint-disable no-console */
import bcrypt from 'bcryptjs';
import user from '../models/user';
import users from './user.json';

const { seedUser } = user;
const hashString = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export default {
  seed: async () => {
    try {
      await Promise.all(
        users.map(
          ({
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            is_admin: isAdmin,
            gender,
            job_role: jobRole,
            department,
            address
          }) =>
            seedUser(
              email,
              hashString(password),
              firstName,
              lastName,
              isAdmin,
              gender,
              jobRole,
              department,
              address
            )
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
};
