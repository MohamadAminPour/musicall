const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// پوشه uploads استاتیک باشه
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// تنظیم storage برای عکس‌ها و فایل‌ها
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // بسته به نوع فایل می‌توان مسیر متفاوت داد
    if (file.mimetype.startsWith("image/")) {
      cb(null, "uploads/images");
    } else if (file.mimetype.startsWith("audio/")) {
      cb(null, "uploads/audio");
    } else {
      cb(null, "uploads/others");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// ایجاد middleware برای آپلود تک فایل
const upload = multer({ storage });

// می‌تونی exportش کنی تا توی روت‌ها استفاده کنی
module.exports = upload;
