const express = require("express");
const Comment = require("../models/Comment");
const commentsRoute = express.Router();

commentsRoute.get("/", (req, res) => {
  Comment.find({}).then((result) => {
    res.json(result).status(200);
  });
});

commentsRoute.post("/", (req, res) => {
  let newComment = new Comment({
    text: req.body.text,
    user_id: req.body.user_id,
    song_id: req.body.song_id,
  });

  newComment.save().then(() => {
    res.json(newComment).status(200);
  });
});

commentsRoute.delete("/:id", (req, res) => {
  Comment.findByIdAndDelete(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "کامنت پیدا نشد" });
      return;
    }
    res.status(200).json({
      message: "کامنت حذف شد",
      result,
    });
  });
});

module.exports = commentsRoute;
