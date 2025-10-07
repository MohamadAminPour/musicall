const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artist", ArtistSchema);
