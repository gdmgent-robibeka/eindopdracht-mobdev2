const mongoose = require('mongoose');
const { Cantus } = require('./Cantus');

const venueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
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
  }
);

venueSchema.pre('remove', function () {
  const venue = this;
  return Cantus.remove({ venueId: venue._id });
});

venueSchema.virtual('fullAddress').get(function () {
  const venue = this;
  return `${venue.address}, ${venue.city}`;
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = {
  Venue,
  venueSchema,
};
