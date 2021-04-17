const { Penalty } = require('../models/Penalty');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

class PenaltyController {
  createPenalty = async (req, res, next) => {
    try {
      const penalty = new Penalty(req.body);
      const p = await penalty.save();
      res.status(200).json(p);
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  getPenalties = async (req, res, next) => {
    try {
      const pentalties = await Penalty.find().exec();
      res.status(200).json(pentalties);
    } catch (e) {
      next(e);
    }
  };

  updatePenaltyById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const penalty = await Penalty.findById(id).exec();

      if (penalty) {
        penalty.overwrite(req.body);
        const p = await penalty.save();
        res.status(200).json(p);
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  deletePenaltyById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const penalty = await Penalty.findById(id).exec();

      if (penalty) {
        await penalty.remove();
        res.status(200).json({});
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e);
    }
  };
}

module.exports = PenaltyController;
