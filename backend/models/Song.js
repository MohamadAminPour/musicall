const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    song: { type: String, required: true },
    text: { type: String, required: true },
    category_id: { type: String, required: true },
    artist_id: { type: String, required: true },
    album_id: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", SongSchema);
