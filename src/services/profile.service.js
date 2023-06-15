const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');
const { getUserByEmail } = require('./user.service');

const getProfileById = async (id) => {
  const profile = await models.Profile.findByPk(id);

  if (!profile) throw boom.notFound('not found');

  return profile;
};

const getProfiles = async () => {
  const listProfiles = await models.Profile.findAll({ include: ['user'] });

  return listProfiles;
};

const createProfile = async (obj) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    // adaptarlo para cuando este en form-data
    const user = await getUserByEmail(obj.user.email);

    if (user !== null) throw boom.unauthorized('Email has been registered');

    const hash = await bcrypt.hash(obj.user.password, 10);

    const finalData = {
      ...obj,
      user: {
        email: obj.user.email,
        password: hash,
        activated: 1,
        loggedToken: 'not authenticated yet',
      },
    };

    const profile = await models.Profile.create(finalData, {
      include: ['user'],
      transaction,
    });

    // if you use code.model you should create a service about code and the next line
    // await useCode(obj.code, obj.user.email);

    await transaction.commit();

    delete profile.dataValues.user.dataValues.password;
    delete profile.dataValues.user_id;
    delete profile.dataValues.userId;

    return profile;
  } catch (err) {
    if (transaction) await transaction.rollback();
    throw err;
  }
};

const updateProfile = async (sub, obj) => {
  const profileToUpdate = await models.Profile.findOne({
    include: [{
      model: models.User,
      as: 'user',
      where: {
        idUser: sub,
      },
    }],
  });

  await profileToUpdate.update(obj);

  return 'profile updated';
};

const deleteProfile = async (id) => {
  const profileToDestroy = await models.Profile.findOne(id);

  await profileToDestroy.destroy();

  return 'profile destroyed';
};

module.exports = {
  getProfileById,
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
};
