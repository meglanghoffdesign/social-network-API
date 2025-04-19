import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../../controllers/userController.js';

const router = express.Router();

// GET all users
router.get('/', getAllUsers);

// GET a single user by _id
router.get('/:userId', getSingleUser);

// POST a new user
router.post('/', createUser);

// PUT to update a user by _id
router.put('/:userId', updateUser);

// DELETE to remove a user by _id
router.delete('/:userId', deleteUser);

// POST to add a friend to a user's friend list
router.post('/:userId/friends/:friendId', addFriend);

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', removeFriend);

export default router;
