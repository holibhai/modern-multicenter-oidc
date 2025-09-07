const express = require("express");
const { body, param } = require("express-validator");
const Order = require("../models/Order");
const router = express.Router();


function isValidDate(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0,0,0,0);
  if (Number.isNaN(d.getTime())) return false;
  const noSunday = d.getDay() !== 0;
  return d >= today && noSunday;
}


router.post(
  "/",
  body("productName").isString().trim().isLength({ min: 1, max: 120 }),
  body("quantity").isInt({ min: 1, max: 1000 }),
  body("message").optional().isString().isLength({ max: 2000 }),
  body("deliveryDate").custom(isValidDate),
  body("deliveryTime").isIn(["10 AM", "11 AM", "12 PM","1 PM","2 PM","3 PM"]),
  body("deliveryDistrict").isString().trim().isLength({ min: 1, max: 100 }),
  async (req, res, next) => {
    try {
      const ownerSub = req.auth?.sub; 
      if (!ownerSub) return res.status(401).json({ error: "Unauthenticated" });

      const order = await Order.create({
        ownerSub,
        productName: req.body.productName,
        quantity: req.body.quantity,
        message: req.body.message || "",
        deliveryDate: req.body.deliveryDate,
        deliveryTime: req.body.deliveryTime,
        deliveryDistrict: req.body.deliveryDistrict,
      });
      res.status(201).json(order);
    } catch (e) {
      next(e);
    }
  }
);


router.get("/", async (req, res, next) => {
  try {
    const ownerSub = req.auth?.sub;
    const orders = await Order.find({ ownerSub }).sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (e) {
    next(e);
  }
});


router.put(
  "/:id",
  param("id").isMongoId(),
  body("quantity").optional().isInt({ min: 1, max: 1000 }),
  body("message").optional().isString().isLength({ max: 2000 }),
  async (req, res, next) => {
    try {
      const ownerSub = req.auth?.sub;
      const order = await Order.findOne({ _id: req.params.id, ownerSub });
      if (!order) return res.status(404).json({ error: "Not found" });

      if (req.body.quantity !== undefined) order.quantity = req.body.quantity;
      if (req.body.message !== undefined) order.message = req.body.message;

      await order.save();
      res.json(order);
    } catch (e) {
      next(e);
    }
  }
);


router.delete("/:id", param("id").isMongoId(), async (req, res, next) => {
  try {
    const ownerSub = req.auth?.sub;
    const result = await Order.deleteOne({ _id: req.params.id, ownerSub });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
