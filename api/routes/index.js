const CantusController = require('../controllers/CantusController');
const SongController = require('../controllers/SongController');
const UserController = require('../controllers/UserController');
const VenueController = require('../controllers/VenueController');
const { authLocal } = require('../services/auth/auth.services');

const songController = new SongController();
const venueController = new VenueController();
const cantusController = new CantusController();
const userController = new UserController();

const registerRoutes = (app) => {
  // User
  app.post('/register', userController.register);
  app.post('/login', authLocal, userController.login);

  // Songs
  app.post('/songs', songController.createSong);
  app.get('/songs', songController.getSongs);
  app.get('/songs/:id', songController.getSongById);
  app.patch('/songs/:id', songController.updateSongById);
  app.delete('/songs/:id', songController.deleteSongById);

  // Venues
  app.post('/venues', venueController.createVenue);
  app.get('/venues', venueController.getVenues);
  app.get('/venues/:id', venueController.getVenueById);
  app.patch('/venues/:id', venueController.updateVenueById);
  app.delete('/venues/:id', venueController.deleteVenueById);

  // Cantusses
  app.post('/cantus', cantusController.createCantus);
  app.get('/cantus', cantusController.getCantusses);
  app.get('/cantus/:id', cantusController.getCantusById);
  app.patch('/cantus/:id', cantusController.updateCantusById);
  app.delete('/cantus/:id', cantusController.deleteCantusById);

  // Default 404
  app.use((req, res, next) => {
    next(new NotFoundError());
  });

  // Error handler
  app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500);
    res.json(err);
  });
};

module.exports = {
  registerRoutes,
};
