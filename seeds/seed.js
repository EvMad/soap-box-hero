const sequelize = require('../config/connection');
const { user, post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Users = await user.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Post of postData) {
    await post.create({
      ...Post,
      user_id: Users[Math.floor(Math.random() * user.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();