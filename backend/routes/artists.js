const express = require("express");
const Artist = require("../models/artist");
const upload = require("../middlewares/multer");
const artistRoute = express.Router();

artistRoute.get("/", (req, res) => {
  Artist.find({}).then((result) => {
    res.json(result).status(200);
  });
});

artistRoute.get("/:id", (req, res) => {
  Artist.findById(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "خواننده پیدا نشد" });
      return;
    }
    res.status(200).json(result);
  });
});

artistRoute.post("/", upload.single("image"), (req, res) => {
  let newArtist = new Artist({
    name: req.body.name,
    bio: req.body.bio,
     image: req.file ? `${req.file.filename}` : "",
  });

  newArtist.save().then(() => {
    res.json(newArtist).status(200);
  });
});

artistRoute.delete("/:id", (req, res) => {
  Artist.findByIdAndDelete(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "خواننده پیدا نشد" });
      return;
    }
    res.status(200).json({
      message: "خواننده حذف شد",
      result,
    });
  });
});

module.exports = artistRoute;
