const express = require('express');
const passport = require('passport');
const validationHandler = require('../middlewares/validator.handler');
const {
  changePasswordRecoverySchema, loginSchema, registerSchema, recoverySchema,
} = require('../schemas/auth.schema');
const { createProfile } = require('../services/profile.service');
const { signToken, sendRecovery, changePassword } = require('../services/auth.service');

const router = express.Router();

router.post(
  '/login',
  validationHandler(loginSchema, 'user'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      // req.user it's only aviable with an auth middleware.
      const result = await signToken(req.user);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/recovery',
  validationHandler(recoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await sendRecovery(email);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/change-password-recovery',
  validationHandler(changePasswordRecoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const respuesta = await changePassword(token, newPassword);
      res.status(201).json(respuesta);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/register',
  validationHandler(registerSchema, 'body'), // this shouldn't be here
  // ToDo add image upload
  async (req, res, next) => {
    try {
      // ToDo adapt to form-data
      const result = await createProfile(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

// un-comment renew-token if you want it
/*
router.get(
  '/renew-token',
  passport.authenticate('jwt', {session: false}),
  async(req, res, next) => {
    try {
      const { sub } = req.user;
      const result = await renewToken(sub);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);
*/

module.exports = router;
