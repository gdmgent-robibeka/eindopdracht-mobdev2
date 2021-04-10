const { Venue } = require('../models/Venue');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

class VenueController {
  createVenue = async (req, res, next) => {
    try {
      const venue = new Venue(req.body);
      const v = await venue.save();
      res.status(200).json(v);
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  getVenues = async (req, res, next) => {
    try {
      const venues = await Venue.find().exec();
      res.status(200).json(venues);
    } catch (e) {
      next(e);
    }
  };

  getVenueById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const venue = await Venue.findById(id).exec();

      if (venue) {
        res.status(200).json(venue);
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e);
    }
  };

  updateVenueById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const venue = await Venue.findById(id).exec();

      if (venue) {
        venue.overwrite(req.body);
        const v = await venue.save();
        res.status(200).json(v);
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  deleteVenueById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const venue = await Venue.findById(id).exec();

      if (venue) {
        await venue.remove();
        res.status(200).json({});
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e);
    }
  };
}

module.exports = VenueController;
