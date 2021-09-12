const router = require("express").Router();
const productCtrl = require("../ctrl/productCtrl");

router.get("/products", productCtrl.getProducts);
router.get("/product/:id", productCtrl.getProduct);
router.post("/product", productCtrl.addProduct);
router.patch("/product/:id", productCtrl.updateProduct);
router.delete("/product/:id", productCtrl.deleteProduct);

module.exports = router;
