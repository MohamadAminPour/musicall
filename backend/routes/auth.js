const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authRoute = express.Router();

authRoute.post("/register", async (req, res) => {
  try {
    const username = req.body.username;

    if (!username) {
      return res.status(404).json({ message: "نام کاربری الزامی است" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "کاربر وجود دارد" });
    }

    const newUser = new User({ username });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "✅ ثبت نام موفق",
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور" });
  }
});

authRoute.post("/login", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "نام کاربری الزامی است" });
    }

    // پیدا کردن کاربر
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "کاربری با این نام پیدا نشد" });
    }

    // ساخت توکن JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // انقضا ۷ روز
    );

    res.status(200).json({
      message: "✅ ورود موفق",
      user: { id: user._id, username: user.username, name: user.name,role: user.role },
      token,
    });
  } catch (err) {
    console.error("خطا در ورود:", err.message);
    res.status(500).json({ message: "⚠️ خطای سرور" });
  }
});

module.exports = authRoute;
