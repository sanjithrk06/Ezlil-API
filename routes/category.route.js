const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const authenticate =  require("../middleware/authenticate");

router.get("/", authenticate, categoryController.getAllCategory);
router.get("/:categoryId", authenticate, categoryController.getCategory);
router.post("/", authenticate, categoryController.createCategory);
router.delete("/:categoryId", authenticate, categoryController.deleteCategory);
router.put("/:categoryId", authenticate, categoryController.updateCategory);

module.exports = router;