const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Cantus } = require('../models/Cantus');

class CantusController {
  createCantus = async (req, res, next) => {
    try {
      const cantus = new Cantus(req.body);
      const c = await cantus.save();
      res.status(200).json(c);
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  getCantusses = async (req, res, next) => {
    try {
      const cantusses = await Cantus.find()
        .lean()
        .populate('venue', ['name'])
        .exec();
      res.status(200).json(cantusses);
    } catch (e) {
      next(e);
    }
  };

  getCantusById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cantus = await Cantus.findById(id).populate('venue').exec();

      if (cantus) {
        res.status(200).json(cantus);
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e);
    }
  };

  updateCantusById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cantus = await Cantus.findById(id).exec();

      if (cantus) {
        cantus.overwrite(req.body);
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
