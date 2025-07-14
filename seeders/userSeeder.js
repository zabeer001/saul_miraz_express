import User from '../models/user.model.js';
import { hashMultiplePasswords } from '../helpers/index.js';

const generateUsers = () => {
  const users = [
    {
      "_id": "68637e46c62fca563bed6dff",
      "name": "Admin User",
      "email": "binzabirtareq@gmail.com",
      "password": "12345678",
      "role": "admin"

    },
  ];
  for (let i = 1; i <= 10; i++) {
    users.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      password: `123456`,
      role: 'user', // force role as 'user' for all
    });
  }
  return users;
};

const userSeeder = async () => {
  await User.deleteMany({});
  console.log('Existing users deleted');

  let users = generateUsers();
  let hashedUsers = await hashMultiplePasswords(users);
  await User.insertMany(hashedUsers);
  console.log('Users seeded successfully');
};

export default userSeeder;
