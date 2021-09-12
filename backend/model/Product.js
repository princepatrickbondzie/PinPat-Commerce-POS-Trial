const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title required."],
    },
    price: {
      type: Number,
      required: [true, "Product price required."],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity required."],
    },
  },
  { timeStamp: true }
);
module.exports = model("Product", productSchema);
