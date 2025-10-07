const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const artistRoute = require("./routes/artists");
const albumRoute = require("./routes/albums");
const songsRoute = require("./routes/songs");
const commentsRoute = require("./routes/comments");
const categoryRoute = require("./routes/categories");
require("dotenv").config();
require("./middlewares/multer")

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/artists", artistRoute);
app.use("/api/albums", albumRoute);
app.use("/api/songs", songsRoute);

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB Connection Error:", err));
