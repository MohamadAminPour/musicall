const express = require("express");
const verifyToken = require("../middlewares/auth");
const User = require("../models/User");

const userRoute = express.Router();

// گرفتن اطلاعات خود کاربر
userRoute.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v"); // فقط اطلاعات لازم
    if (!user) return res.status(404).json({ message: "کاربر پیدا نشد" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
  }
});

userRoute.get("/", (req, res) => {
  User.find({}).then((result) => {
    res.json(result).status(200);
  });
});

userRoute.get("/:id", (req, res) => {
  User.findById(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "کاربر پیدا نشد" });
      return;
    }
    res.status(200).json(result);
  });
});

userRoute.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "کاربر پیدا نشد" });
      return;
    }
    res.status(200).json({
      message: "کاربر حذف شد",
      result,
    });
  });
});

module.exports = userRoute;
