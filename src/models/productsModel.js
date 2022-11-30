const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    rating: {
      type: {
        rate: {
          type: Number,
        },
        count: {
          type: Number,
        },
      },
    },
  },
  { collection: "product" }
);

const ProductModel = mongoose.model("Products", ProductsSchema);

module.exports = ProductModel;
