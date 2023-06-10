const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const getUserById = async (id) => {
  const user = await models.User.findByPk(id);

  if (!user) throw boom.notFound('User not found');

  return user;
};

const getUsers = async () => {
  const listUsers = await models.User.findAll();

  return listUsers;
};

const createUser = async (obj) => {
  const userToCreate = await models.User.create(obj);

  return userToCreate;
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

module.exports = {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
