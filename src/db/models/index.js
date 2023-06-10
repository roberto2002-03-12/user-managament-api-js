const { UserSchema, User } = require('./user.model');
const { Role, RoleSchema } = require('./role.model');
const { UserRole, UserRoleSchema } = require('./user_role.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  UserRole.init(UserRoleSchema, UserRole.config(sequelize));

  User.associate(sequelize.models);
  Role.associate(sequelize.models);
}

module.exports = setUpModels;
