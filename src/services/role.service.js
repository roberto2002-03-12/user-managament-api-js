const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { getUserById } = require('./user.service');

const getRoleById = async (id) => {
  const role = await models.Role.findByPk(id);

  if (!role) throw boom.notFound('Role not found');

  return role;
};

const getRoles = async () => {
  const listRoles = await models.Role.findAll();

  return listRoles;
};

const createRole = async (obj) => {
  const roleToCreate = await models.Role.create(obj);

  return roleToCreate;
};

const updateRole = async (id, obj) => {
  const roleToUpdate = await getRoleById(id);

  await roleToUpdate.update(obj);

  return 'role updated';
};

const deleteRole = async (id) => {
  const roleToDestroy = await getRoleById(id);

  await roleToDestroy.destroy();

  return 'role destroyed';
};

const addRoleToUser = async (idUser, idRole, idWhoAssigned) => {
  const userWhoAssigned = await getUserById(idWhoAssigned);
  await getUserById(idUser);
  await getRoleById(idRole);

  const roleAssigned = await models.UserRole.create({
    userId: idUser,
    roleId: idRole,
    assignedBy: userWhoAssigned.dataValues.email,
  });

  return roleAssigned;
};

const deleteRoleAssigned = async (idUserRole) => {
  const roleAssigned = await models.UserRole.findByPk(idUserRole);

  await roleAssigned.destroy();

  return 'role assigned deleted';
};

module.exports = {
  getRoleById,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  addRoleToUser,
  deleteRoleAssigned,
};
