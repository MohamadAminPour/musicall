const express = require("express");
const Song = require("../models/Song");
const upload = require("../middlewares/multer");
const songsRoute = express.Router();

songsRoute.get("/", (req, res) => {
  Song.find({}).then((result) => {
    res.json(result).status(200);
  });
});

songsRoute.get("/:id", (req, res) => {
  Song.findById(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "موزیک پیدا نشد" });
      return;
    }
    res.status(200).json(result);
  });
});

songsRoute.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "song", maxCount: 1 },
  ]),
  (req, res) => {
    let newSong = new Song({
      name: req.body.name,
      image: req.files.image ? req.files.image[0].filename : "",
      song:  req.files.song ? req.files.song[0].filename : "",
      text: req.body.text,
      category_id: req.body.category_id,
      album_id: req.body.album_id,
      artist_id: req.body.artist_id,
    });

    newSong.save().then(() => {
      res.json(newSong).status(200);
    });
  }
);

songsRoute.delete("/:id", (req, res) => {
  Song.findByIdAndDelete(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "موزیک پیدا نشد" });
      return;
    }
    res.status(200).json({
      message: "موزیک حذف شد",
      result,
    });
  });
});

module.exports = songsRoute;
