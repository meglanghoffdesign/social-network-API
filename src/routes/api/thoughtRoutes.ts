import express from 'express';
import {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} from '../../controllers/thoughtController.js';

const router = express.Router();

// GET all thoughts
router.get('/', getAllThoughts);

// GET a single thought by its _id
router.get('/:thoughtId', getSingleThought);

// POST to create a new thought
router.post('/', createThought);

// PUT to update a thought by its _id
router.put('/:thoughtId', updateThought);

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', deleteThought);

// POST to create a reaction to a thought
router.post('/:thoughtId/reactions', createReaction);

// DELETE to remove a reaction from a thought by reactionId
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

export default router;