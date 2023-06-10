const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_ROLE_TABLE, UserRoleSchema } = require('./user_role.model');

const USER_TABLE = 'user';

const UserSchema = {
  idUser: {
    field: 'id_user',
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  loggedToken: {
    field: 'logged_token',
    type: DataTypes.STRING,
    allowNull: false,
  },
  recoveryToken: {
    field: 'recovery_token',
    type: DataTypes.STRING,
    allowNull: true,
  },
};

class User extends Model {
  static associate(model) {
    this.belongsToMany(model.Role, {
      as: 'role',
      through: USER_ROLE_TABLE,
      foreignKey: UserRoleSchema.userId.field,
      otherKey: UserRoleSchema.roleId.field,
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'User',
      tableName: USER_TABLE,
      timestamps: true,
    };
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
};
