const express = require("express");
const router = express.Router();
const validateProductBody = require("../middleware/validateProduct");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(validateProductBody(false), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(validateProductBody(true), updateProduct)
  .delete(deleteProduct);

module.exports = router;
