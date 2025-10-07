const express = require("express");
const Category = require("../models/Category");
const categoryRoute = express.Router();

categoryRoute.get("/", (req, res) => {
  Category.find({}).then((result) => {
    res.json(result).status(200);
  });
});

categoryRoute.get("/:id", (req, res) => {
  Category.findById(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "دسته بندی پیدا نشد" });
      return;
    }
    res.status(200).json(result);
  });
});

categoryRoute.post("/", (req, res) => {
  let newCategory = new Category({
    name: req.body.name
  });

  newCategory.save().then(() => {
    res.json(newCategory).status(200);
  });
});

categoryRoute.delete("/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id).then((result) => {
    if (result === null) {
      res.status(404).json({ message: "دسته بندی پیدا نشد" });
      return;
    }
    res.status(200).json({
      message: "دسته بندی حذف شد",
      result,
    });
  });
});

module.exports = categoryRoute;
