const { format } = require('date-fns');
const mongoose = require('mongoose');

const cantusSchema = mongoose.Schema(
  {
    studentUnion: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: function () {
        return format(new Date(), 'yyyy-MM-dd');
      },
    },
    venueId: {
      type: 'ObjectId',
      required: true,
    },
    userId: {
      type: 'ObjectId',
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

cantusSchema.virtual('venue', {
  ref: 'Venue',
  localField: 'venueId',
  foreignField: '_id',
  justOne: true,
});

cantusSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

const Cantus = mongoose.model('Cantus', cantusSchema);

module.exports = {
  Cantus,
  cantusSchema,
};
