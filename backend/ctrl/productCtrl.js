const Product = require("../model/Product");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  const id = req.params;
  const product = await Product.findById(id);
  res.status(200).json({ product });
};

const addProduct = async (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const quantity = req.body.quantity;
  console.log(title, price, quantity);

  const product = await Product.create({ title, price, quantity });
  res.status(200).json({ product });
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.status(200).json({ message: "Product Deleted Successfully" });
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
