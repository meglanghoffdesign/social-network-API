import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction.js';

// Thought model schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt: Date) => createdAt.toLocaleString(), // Format the timestamp
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Reference the reactionSchema as an array
  },
  {
    toJSON: {
      getters: true, // Apply getters on queries (for formatted date)
    },
    id: false, // Disable automatic id field for subdocument
  }
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function (this: any) {
  return this.reactions.length;
});

// Create the Thought model based on the schema
const Thought = model('Thought', thoughtSchema);

export default Thought;