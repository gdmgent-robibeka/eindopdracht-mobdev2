const express = require('express');
const CantusController = require('../controllers/CantusController');
const SongController = require('../controllers/SongController');
const VenueController = require('../controllers/VenueController');
const { withRole } = require('../services/auth/auth.services');

const songController = new SongController();
const venueController = new VenueController();
const cantusController = new CantusController();

const authRouter = express.Router();
const adminRouter = express.Router();

// Songs
authRouter.get('/songs', songController.getSongs);
authRouter.get('/songs/:id', songController.getSongById);
adminRouter.post('/songs', songController.createSong);
adminRouter.patch('/songs/:id', songController.updateSongById);
adminRouter.delete('/songs/:id', songController.deleteSongById);

// Venues
authRouter.get('/venues', venueController.getVenues);
authRouter.get('/venues/:id', venueController.getVenueById);
adminRouter.post('/venues', withRole('admin'), venueController.createVenue);
adminRouter.patch('/venues/:id', venueController.updateVenueById);
adminRouter.delete('/venues/:id', venueController.deleteVenueById);

// Cantusses
authRouter.get('/cantus', cantusController.getCantusses);
authRouter.get('/cantus/:id', cantusController.getCantusById);
adminRouter.post('/cantus', cantusController.createCantus);
adminRouter.patch('/cantus/:id', cantusController.updateCantusById);
adminRouter.delete('/cantus/:id', cantusController.deleteCantusById);

authRouter.use(withRole('admin'), adminRouter);

module.exports = authRouter;
