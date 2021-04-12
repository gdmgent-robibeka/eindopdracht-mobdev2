const express = require('express');
const CantusController = require('../controllers/CantusController');
const SongController = require('../controllers/SongController');
const VenueController = require('../controllers/VenueController');

const songController = new SongController();
const venueController = new VenueController();
const cantusController = new CantusController();

const authRouter = express.Router();

// Songs
authRouter.post('/songs', songController.createSong);
authRouter.get('/songs', songController.getSongs);
authRouter.get('/songs/:id', songController.getSongById);
authRouter.patch('/songs/:id', songController.updateSongById);
authRouter.delete('/songs/:id', songController.deleteSongById);

// Venues
authRouter.post('/venues', venueController.createVenue);
authRouter.get('/venues', venueController.getVenues);
authRouter.get('/venues/:id', venueController.getVenueById);
authRouter.patch('/venues/:id', venueController.updateVenueById);
authRouter.delete('/venues/:id', venueController.deleteVenueById);

// Cantusses
authRouter.post('/cantus', cantusController.createCantus);
authRouter.get('/cantus', cantusController.getCantusses);
authRouter.get('/cantus/:id', cantusController.getCantusById);
authRouter.patch('/cantus/:id', cantusController.updateCantusById);
authRouter.delete('/cantus/:id', cantusController.deleteCantusById);

module.exports = authRouter;
