import { Request, Response } from 'express';
import { Types } from 'mongoose'; // Ensure Types is imported
import User from '../models/User.js';
import Thought from '../models/Thought.js';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find();
      res.json(users); // Send the response here
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving users', error: err });
    }
  };

export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Ensure you return after sending the response
    }
    res.json(user); // Send the response here
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: err });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user); // Send the response here
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return; // Ensure you return after sending the response
    }
    res.json(updatedUser); // Send the response here
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Ensure you return after sending the response
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User and associated thoughts deleted' }); // Send the response here
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      res.status(404).json({ message: 'User or Friend not found' });
      return; // Ensure you return after sending the response
    }

    const friendId = new Types.ObjectId(req.params.friendId); // Convert friendId to ObjectId

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }

    res.json({ message: 'Friend added successfully', user }); // Send the response here
  } catch (err) {
    res.status(500).json({ message: 'Error adding friend', error: err });
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Ensure you return after sending the response
    }

    const friendId = new Types.ObjectId(req.params.friendId); // Convert friendId to ObjectId

    user.friends = user.friends.filter(
      (friend: Types.ObjectId) => friend.toString() !== friendId.toString()
    );
    await user.save();

    res.json({ message: 'Friend removed successfully', user }); // Send the response here
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err });
  }
};