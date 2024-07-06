const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const authenticate =  require("../middleware/authenticate");

router.post("/", authenticate, categoryController.createCategory);
router.delete("/:categoryId", authenticate, categoryController.deleteCategory);
router.put("/:categoryId", authenticate, categoryController.updateCategory);
router.get("/category/:categoryId", authenticate, categoryController.getCategory);
router.get("/category", authenticate, categoryController.getAllCategory);

module.exports = router;