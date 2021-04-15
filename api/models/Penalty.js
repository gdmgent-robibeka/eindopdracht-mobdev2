const mongoose = require('mongoose');

const penaltySchema = mongoose.Schema(
  {
    penaltyName: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Penalty = mongoose.model('Penalty', penaltySchema);

module.exports = {
  Penalty,
  penaltySchema,
};
