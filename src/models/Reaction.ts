import { Schema, Types } from 'mongoose';

// Reaction subdocument schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt: Date) => createdAt.toLocaleString(), // Format the date
    },
  },
  {
    toJSON: {
      getters: true, // Apply getters on queries (for formatted date)
    },
    id: false, // Disable automatic id field for subdocument
  }
);

// Export reaction schema
export default reactionSchema;