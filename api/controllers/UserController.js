const ValidationError = require('../errors/ValidationError');
const { User } = require('../models/User');

class UserController {
  register = async (req, res, next) => {
    try {
      const user = new User(req.body);
      const u = await user.save();
      res.status(200).json(u);
    } catch (e) {
      next(e.errros ? new ValidationError(e) : e);
    }
  };

  login = async (req, res, next) => {
    const { user } = req;
    const { _id, email, role } = user;
    res.status(200).json({
      _id,
      email,
      role,
      token: user.createToken(),
    });
  };
}

module.exports = UserController;
