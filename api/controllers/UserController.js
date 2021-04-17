const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { User, ROLES } = require('../models/User');

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
      const values = {
        ...req.body,
        role: ROLES.user,
      };
      const user = new User(values);
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

  getUsers = async (req, res, next) => {
    try {
      const users = await User.find()
        .select(['userName', 'email', 'role'])
        .exec();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  };

  updateUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).exec();

      if (user) {
        user.overwrite({
          ...req.body,
          password: user.password,
        });
        const u = await user.save();
        res.status(200).json(u);
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).exec();

      if (user) {
        await user.remove();
        res.status(200).json({});
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e);
    }
  };
}

module.exports = UserController;
