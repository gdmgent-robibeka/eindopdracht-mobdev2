const ValidationError = require('../errors/ValidationError');
const { User } = require('../models/User');

const getUserResponse = (user) => {
  return {
    user: {
      email: user.email,
      role: user.role,
      _id: user._id,
    },
    token: user.createToken(),
  };
};

class UserController {
  register = async (req, res, next) => {
    try {
      const user = new User(req.body);
      const u = await user.save();
      res.status(200).json(getUserResponse(u));
    } catch (e) {
      next(e.errros ? new ValidationError(e) : e);
    }
  };

  login = async (req, res, next) => {
    const { user } = req;
    res.status(200).json(getUserResponse(user));
  };
}

module.exports = UserController;
