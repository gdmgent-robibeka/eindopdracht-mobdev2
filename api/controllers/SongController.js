const { Song } = require('../models/Song');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

class SongController {
  createSong = async (req, res, next) => {
    try {
      const song = new Song(req.body);
      const s = await song.save();
      res.status(200).json(s);
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  getSongs = async (req, res, next) => {
    try {
      // if (req.query.title) {
      //   //return res.send(req.query.title);
      //   const songs = await Song.find({ title: req.query.title }).exec();
      //   res.status(200).json(songs);
      // }
      const songs = await Song.find().exec();
      res.status(200).json(songs);
    } catch (e) {
      next(e);
    }
  };

  // getSongById = async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const song = await Song.findById(id).exec();

  //     if (song) {
  //       res.status(200).json(song);
  //     } else {
  //       next(new NotFoundError());
  //     }
  //   } catch (e) {
  //     next(e);
  //   }
  // };

  updateSongById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const song = await Song.findById(id).exec();

      if (song) {
        song.overwrite(req.body);
        const s = await song.save();
        res.status(200).json(s);
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e.errors ? new ValidationError(e) : e);
    }
  };

  deleteSongById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const song = await Song.findById(id).exec();

      if (song) {
        await song.remove();
        res.status(200).json({});
      } else {
        next(new NotFoundError());
      }
    } catch (e) {
      next(e);
    }
  };
}

module.exports = SongController;
