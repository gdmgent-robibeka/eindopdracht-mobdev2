const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../../models/User');

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (user) {
        const check = await user.comparePassword(password);

        if (check) {
          return done(null, user);
        }
      }
      return done(null, false);
    } catch (e) {
      return done(e, false);
    }
  }
);

passport.use(localStrategy);

const authLocal = passport.authenticate('local', { session: false });

module.exports = {
  authLocal,
};
