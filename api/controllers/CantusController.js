const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Cantus } = require('../models/Cantus');

class CantusController {
  getDocumentById = async (id) => {
    return await Cantus.findById(id).lean().populate('user', ['name']).exec();
  };

  createCantusByVenue = async (req, res, next) => {
    try {
      const { user, params } = req;
      const { venueId } = params;

      const cantus = new Cantus({
        ...req.body,
        userId: user._id,
        venueId,
      });

      const c = await cantus.save();
      // const c = await this.getDocumentById(_id);

      res.status(200).json(c);
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  getCantussesByVenue = async (req, res, next) => {
    try {
      const { user, params } = req;
      const { venueId } = params;

      let query;

      if (!user.isAdmin()) {
        query = Cantus.find({ venueId });
      } else {
        query = Cantus.find({ venueId }).populate('user', ['userName']);
      }

      const cantusses = await query.sort({ date: 'asc' }).exec();
      res.status(200).json(cantusses);
    } catch (e) {
      next(e);
    }
  };

  updateCantusByVenue = async (req, res, next) => {
    try {
      const { user, params } = req;
      const { id, venueId } = params;
      const cantus = await Cantus.findById(id).exec();

      if (cantus) {
        cantus.overwrite({
          _id: id,
          ...req.body,
          venueId,
          userId: user._id,
        });
        const c = await cantus.save();
        res.status(200).json(c);
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  deleteCantusById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cantus = await Cantus.findById(id).exec();
      console.log(cantus);
      if (cantus) {
        await cantus.remove();
        res.status(200).json({});
      } else {
        next(new ValidationError());
      }
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };
}

module.exports = CantusController;
