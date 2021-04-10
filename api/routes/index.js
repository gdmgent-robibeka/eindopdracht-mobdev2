const SongController = require('../controllers/SongController');
const VenueController = require('../controllers/VenueController');

const songController = new SongController();
const venueController = new VenueController();

const registerRoutes = (app) => {
  app.post('/songs', songController.createSong);
  app.get('/songs', songController.getSongs);
  app.get('/songs/:id', songController.getSongById);
  app.patch('/songs/:id', songController.updateSongById);
  app.delete('/songs/:id', songController.deleteSongById);

  app.post('/venues', venueController.createVenue);
  app.get('/venues', venueController.getVenues);
  app.get('/venues/:id', venueController.getVenueById);
  app.patch('/venues/:id', venueController.updateVenueById);
  app.delete('/venues/:id', venueController.deleteVenueById);
};

module.exports = {
  registerRoutes,
};
