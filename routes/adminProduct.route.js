const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const authenticate =  require("../middleware/authenticate");
const upload = require("../middleware/upload");
router.post("/",upload.single('imageUrl'), productController.createProduct);
router.delete("/:id", authenticate, productController.deleteProduct);
router.put("/:id",upload.single('imageUrl'),  authenticate, productController.updateProduct);

module.exports = router;