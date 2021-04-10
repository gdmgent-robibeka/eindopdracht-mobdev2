const { Venue } = require('../models/Venue');

class VenueController {
  createVenue = async (req, res, next) => {
    try {
      const venue = new Venue(req.body);
      const v = await venue.save();
      res.status(200).json(v);
    } catch (e) {
      next(e);
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
        return res.status(200).json(venue);
      }

      res.status(404).json({ error: 'Not Found' });
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
        return res.status(200).json(v);
      }

      res.status(404).json({ error: 'Not Found' });
    } catch (e) {
      next(e);
    }
  };

  deleteVenueById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const venue = await Venue.findById(id).exec();

      if (venue) {
        await venue.remove();
        return res.status(200).json({});
      }

      res.status(404).json({ error: 'Not Found' });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = VenueController;
