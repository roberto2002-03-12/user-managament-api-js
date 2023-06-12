const { DataTypes, Model, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { ROLE_TABLE } = require('./role.model');

const USER_ROLE_TABLE = 'user_has_role';

const UserRoleSchema = {
  idUserRole: {
    field: 'id_user_role',
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    field: 'user_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: USER_TABLE,
      key: 'id_user',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  roleId: {
    field: 'role_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ROLE_TABLE,
      key: 'id_rol',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  assignedBy: {
    field: 'assigned_by',
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class UserRole extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'UserRole',
      tableName: USER_ROLE_TABLE,
      timestamps: true,
    };
  }
}

module.exports = {
  USER_ROLE_TABLE,
  UserRoleSchema,
  UserRole,
};
