const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { getUserById } = require('./user.service');

const getBlackTokenById = async (id) => {
  const blackToken = await models.BlackToken.findByPk(id);

  if (!blackToken) throw boom.notFound('not found');

  return blackToken;
};

const getBlackTokenByToken = async (token) => {
  const blackToken = await models.BlackToken.findOne({ where: { token } });

  return blackToken;
};

const getBlackTokens = async () => {
  const listBlackTokens = await models.BlackToken.findAll();

  return listBlackTokens;
};

const addBlackToken = async ({ idUser }, sub) => {
  const user = await getUserById(idUser);
  const userAdmin = await getUserById(sub);

  const blackTokenToCreate = await models.BlackToken.create({
    token: user.dataValues.loggedToken,
    bannedTo: user.dataValues.email,
    addedBy: userAdmin.dataValues.email,
  });

  return blackTokenToCreate;
};

const deleteBlackToken = async (id) => {
  const blackTokenToDestroy = await getBlackTokenById(id);

  await blackTokenToDestroy.destroy();

  return 'blackToken destroyed';
};

module.exports = {
  getBlackTokenById,
  getBlackTokens,
  addBlackToken,
  deleteBlackToken,
  getBlackTokenByToken,
};
