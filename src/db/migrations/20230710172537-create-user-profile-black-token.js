const { USER_TABLE, UserSchema } = require('../models/user.model');
const { PROFILE_TABLE, ProfileSchema } = require('../models/profile.model');
const { BLACK_TOKEN_TABLE, BlackTokenSchema } = require('../models/black_token.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PROFILE_TABLE, ProfileSchema);
    await queryInterface.createTable(BLACK_TOKEN_TABLE, BlackTokenSchema);
  },
};
