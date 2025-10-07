const express = require("express");
const Album = require("../models/Album");
const upload = require("../middlewares/multer");
const albumRoute = express.Router();

albumRoute.get("/", (req, res) => {
  Album.find({}).then((result) => {
    res.json(result).status(200);
  });
});

albumRoute.get("/:id", (req, res) => {
  Album.findById(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "آلبوم پیدا نشد" });
      return;
    }
    res.status(200).json(result);
  });
});

albumRoute.post("/", upload.single("image"),(req, res) => {
  let newAlbum = new Album({
    name: req.body.name,
    artist_id: req.body.artist_id,
    image: req.file ? req.file.filename : "",
  });

  newAlbum.save().then(() => {
    res.json(newAlbum).status(200);
  });
});

albumRoute.delete("/:id", (req, res) => {
  Album.findByIdAndDelete(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "آلبوم پیدا نشد" });
      return;
    }
    res.status(200).json({
      message: "آلبوم حذف شد",
      result,
    });
  });
});

module.exports = albumRoute;
