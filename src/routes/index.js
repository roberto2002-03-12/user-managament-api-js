const express = require('express');
const {
  getUserById, createUser, updateUser, deleteUser, getUsers,
} = require('../services/user.service');

const router = express.Router();

router.post(
  '/user',
  async (req, res) => {
    try {
      const result = await createUser(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
    }
  },
);
