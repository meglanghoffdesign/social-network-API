import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving thoughts', error: err });
  }
};

// GET a single thought by its _id
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving thought', error: err });
  }
};

// POST to create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const { thoughtText, username, userId } = req.body;

    const thought = await Thought.create({ thoughtText, username });

    // Push the created thought's _id to the user's thoughts array
    await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });

    return res.status(201).json(thought);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating thought', error: err });
  }
};

// PUT to update a thought by its _id
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating thought', error: err });
  }
};

// DELETE to remove a thought by its _id
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Option 1: If userId is passed via body
    const { userId } = req.body;

    // Option 2 (alt): If userId was stored in the thought schema, you could use thought.userId

    await User.findByIdAndUpdate(
      userId,
      { $pull: { thoughts: thought._id } },
      { new: true }
    );

    return res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting thought', error: err });
  }
};

// POST to create a reaction to a thought
export const createReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions.push(req.body as never); // Casting as never to bypass TS strictness
    await thought.save();

    return res.status(201).json(thought);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating reaction', error: err });
  }
};

// DELETE to remove a reaction from a thought by reactionId
export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Use Mongoose's built-in pull to safely remove subdocument
    thought.reactions.pull({ _id: req.params.reactionId });
    await thought.save();

    return res.json({ message: 'Reaction deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting reaction', error: err });
  }
};
