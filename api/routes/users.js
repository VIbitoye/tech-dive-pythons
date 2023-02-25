const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUser, deleteUser, updateUser } = require('../controllers/userController');

// Get all users
router.get('/', getUsers);

// Get a single user
router.get('/:id', getUser);

// Create a new user
router.post('/', createUser);

// Delete a user
router.delete('/:id', deleteUser);

// Update a user
router.patch('/:id', updateUser);

module.exports = router;