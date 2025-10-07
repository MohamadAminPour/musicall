const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user_id: { type: String, required: true },
    song_id: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
