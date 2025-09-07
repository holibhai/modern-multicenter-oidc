const express = require("express");
const { body, param } = require("express-validator");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.json(products);
  } catch (e) {
    next(e);
  }
});


router.get("/:id", param("id").isMongoId(), async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/",
  body("title").isString().trim().isLength({ min: 1, max: 120 }),
  body("description").isString().trim().isLength({ min: 1, max: 500 }),
  body("image").isURL(),
  async (req, res, next) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
