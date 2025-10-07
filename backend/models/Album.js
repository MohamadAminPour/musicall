const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    artist_id: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", AlbumSchema);
