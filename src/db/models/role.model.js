const { Sequelize, Model, DataTypes } = require('sequelize');
const { USER_ROLE_TABLE, UserRoleSchema } = require('./user_role.model');

const ROLE_TABLE = 'rol';

const RoleSchema = {
  idRol: {
    field: 'id_rol',
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  roleName: {
    field: 'role_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
  },
  /*
    you should add "createdBy" in case
    you want to create roles with credentials
  */
};

class Role extends Model {
  static associate(model) {
    this.belongsToMany(model.User, {
      as: 'user',
      foreignKey: UserRoleSchema.roleId.field,
      otherKey: UserRoleSchema.userId.field,
      through: USER_ROLE_TABLE,
    });
  }

  static config(sequelize) {
    return {
      modelName: 'Role',
      tableName: ROLE_TABLE,
      sequelize,
      timestamps: true,
    };
  }
}

module.exports = {
  ROLE_TABLE,
  RoleSchema,
  Role,
};
