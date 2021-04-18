const express = require('express');
const CantusController = require('../controllers/CantusController');
const PenaltyController = require('../controllers/PenaltyController');
const SongController = require('../controllers/SongController');
const UserController = require('../controllers/UserController');
const VenueController = require('../controllers/VenueController');
const { ROLES } = require('../models/User');
const { withRole } = require('../services/auth/auth.services');

const songController = new SongController();
const venueController = new VenueController();
const cantusController = new CantusController();
const penaltyController = new PenaltyController();
const userController = new UserController();

const authRouter = express.Router();
const adminRouter = express.Router();

// Songs
authRouter.get('/songs', songController.getSongs);
adminRouter.post('/songs', songController.createSong);
adminRouter.patch('/songs/:id', songController.updateSongById);
adminRouter.delete('/songs/:id', songController.deleteSongById);

// Venues
authRouter.get('/venues', venueController.getVenues);
authRouter.get('/venues/:id', venueController.getVenueById);
adminRouter.post('/venues', venueController.createVenue);
adminRouter.patch('/venues/:id', venueController.updateVenueById);
adminRouter.delete('/venues/:id', venueController.deleteVenueById);

// Cantusses
authRouter.get(
  '/venues/:venueId/cantusses',
  cantusController.getCantussesByVenue
);
authRouter.post(
  '/venues/:venueId/cantusses',
  cantusController.createCantusByVenue
);
adminRouter.patch(
  '/venues/:venueId/cantusses/:id',
  cantusController.updateCantusByVenue
);
adminRouter.delete(
  '/venues/:venueId/cantusses/:id',
  cantusController.deleteCantusById
);

// Penalties
authRouter.get('/penalties', penaltyController.getPenalties);
adminRouter.post('/penalties', penaltyController.createPenalty);
adminRouter.patch('/penalties/:id', penaltyController.updatePenaltyById);
adminRouter.delete('/penalties/:id', penaltyController.deletePenaltyById);

// Users
adminRouter.get('/users', userController.getUsers);
authRouter.patch('/users/:id', userController.updateUserById);
adminRouter.delete('/users/:id', userController.deleteUserById);

authRouter.use(withRole(ROLES.admin), adminRouter);

module.exports = authRouter;
