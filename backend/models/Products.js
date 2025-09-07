const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 120 },
    description: { type: String, required: true, maxlength: 500 },
    image: { type: String, required: true },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
