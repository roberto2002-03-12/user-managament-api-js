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

  const user = await userToUpdate.update(obj);
  delete user.dataValues.password;
  for (let i = 0; i < user?.role.length; i += 1) {
    delete user?.role[i]?.dataValues.idRol;
  }

  return user;
};

const deleteUser = async (id) => {
  const userToDestroy = await getUserById(id);

  await userToDestroy.destroy();

  return 'user destroyed';
};

const changePassword = async (sub, obj) => {
  const findUser = await getUserById(sub);

  if (findUser.dataValues.activated !== true) throw boom.unauthorized('account desactivated');

  /*
  I could use simple conditional (conditional === value) ? "value" : "repeat"
  but hashPassword does some process, so it's better to repeat code than do
  unnecessary process that takes time.
  */

  if (obj.email && obj.password) {
    const hashPassword = await bcrypt.hash(obj.password, 10);

    await findUser.update({
      email: obj.email,
      password: hashPassword,
    });
  } else if (obj.email) {
    await findUser.update({
      email: obj.email,
    });
  } else {
    const hashPassword = await bcrypt.hash(obj.password, 10);

    await findUser.update({
      password: hashPassword,
    });
  }

  return { message: 'user updated' };
};

// I could use the first version, but i don't want to mess other code part
// so i'll just create another one.
const getUserByIdV2 = async (sub) => {
  const user = await models.User.findByPk(sub, {
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

  return user;
};

module.exports = {
  getUserById,
  getUserByIdV2,
  getUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
