const mongoose = require('mongoose');

const songSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    isOfficial: {
      type: Boolean,
      required: true,
    },
    page: {
      type: Number,
      required: true,
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

const Song = mongoose.model('Song', songSchema);

module.exports = {
  Song,
  songSchema,
};
