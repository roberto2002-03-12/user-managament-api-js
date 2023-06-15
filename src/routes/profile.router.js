const express = require('express');
const passport = require('passport');
const validationHandler = require('../middlewares/validator.handler');
const { updateProfileSchema } = require('../schemas/profile.schema');
const {
  getProfiles, createProfile, updateProfile,
} = require('../services/profile.service');

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      const result = await createProfile(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/',
  async (req, res, next) => {
    try {
      const result = await getProfiles();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  '/update-profile',
  passport.authenticate('jwt', { session: false }),
  validationHandler(updateProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const result = await updateProfile(sub, req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
