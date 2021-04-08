const SongController = require('../controllers/SongController');

const songController = new SongController();

const registerRoutes = (app) => {
  app.post('/songs', songController.createSong);
  app.get('/songs', songController.getSongs);
  app.get('/songs/:id', songController.getSongById);
  app.patch('/songs/:id', songController.updateSongById);
  app.delete('/songs/:id', songController.deleteSong);
};

module.exports = {
  registerRoutes,
};
