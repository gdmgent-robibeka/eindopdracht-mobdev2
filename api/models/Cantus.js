const mongoose = require('mongoose');

const cantusSchema = mongoose.Schema(
  {
    studentUnion: {
      type: String,
      required: true,
    },
    venueId: {
      type: 'ObjectId',
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

cantusSchema.virtual('venue', {
  ref: 'Venue',
  localField: 'venueId',
  foreignField: '_id',
  justOne: true,
});

const Cantus = mongoose.model('Cantus', cantusSchema);

module.exports = {
  Cantus,
  cantusSchema,
};
