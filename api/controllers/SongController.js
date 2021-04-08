const { Song } = require('../models/Song');

class SongController {
  createSong = async (req, res, next) => {
    try {
      const song = new Song(req.body);
      const s = await song.save();
      res.status(200).json(s);
    } catch (e) {
      next(e);
    }
  };

  getSongs = async (req, res, next) => {
    try {
      if (req.query.title) {
        //return res.send(req.query.title);
        const songs = await Song.find({ title: req.query.title }).exec();
        res.status(200).json(songs);
      }
      const songs = await Song.find().exec();
      res.status(200).json(songs);
    } catch (e) {
      next(e);
    }
  };

  getSongById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const song = await Song.findById(id).exec();

      if (song) {
        res.status(200).json(song);
      }

      res.status(404).json({ error: 'Not found' });
    } catch (e) {
      next(e);
    }
  };

  updateSongById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const song = await Song.findById(id).exec();

      if (song) {
        song.overwrite(req.body);
        const s = await song.save();
        res.status(200).json(s);
      }

      res.status(404).json({ error: 'Not found' });
    } catch (e) {}
  };

  deleteSong = async (req, res, next) => {
    try {
      const { id } = req.params;
      const song = await Song.findById(id).exec();

      if (song) {
        await song.remove();
        res.status(200).json({});
      }

      res.status(404).json({ error: 'Not found' });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = SongController;
