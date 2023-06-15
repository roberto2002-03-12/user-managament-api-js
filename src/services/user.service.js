const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
const { Role } = require('../db/models/role.model');
const { Profile } = require('../db/models/profile.model');

const getUserByEmail = async (emailToFind) => {
  const userFound = await models.User.findOne({
    where: {
      email: emailToFind,
    },
    include: [{
      model: Role,
      as: 'role',
      attributes: {
        exclude: ['idRol'],
      },
    },
    {
      model: Profile,
      as: 'profile',
    },
    ],
    attributes: {
      exclude: ['loggedToken', 'recoveryToken'],
    },
  });

  return userFound;
};

const getUserById = async (id) => {
  const user = await models.User.findByPk(id, {
    include: ['role'],
  });

  if (!user) throw boom.notFound('User not found');

  return user;
};

const getUsers = async () => {
  const listUsers = await models.User.findAll({ include: ['role'] });

  return listUsers;
};

const updateUser = async (id, obj) => {
  const userToUpdate = await getUserById(id);

  await userToUpdate.update(obj);

  return 'user updated';
};

const deleteUser = async (id) => {
  const userToDestroy = await getUserById(id);

  await userToDestroy.destroy();

  return 'user destroyed';
};

const changePassword = async (sub, { password }) => {
  const findUser = await getUserById(sub);

  if (findUser.dataValues.activated !== true) throw boom.unauthorized('account desactivated');
  console.log(password);
  const hashPassword = await bcrypt.hash(password, 10);

  await findUser.update({
    password: hashPassword,
  });

  return 'password changed';
};

module.exports = {
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
