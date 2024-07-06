const express = require("express");
const router = express.Router();

const orderController = require("../controllers/adminOrder.controller");
const authenticate =  require("../middleware/authenticate");

router.get("/", authenticate, orderController.getAllOrders);
router.get("/:orderId/confirmed", authenticate, orderController.confirmedOrders);
router.get("/:orderId/ship", authenticate, orderController.shippOrders);
router.get("/:orderId/deliver", authenticate, orderController.deliverOrders);
router.get("/:orderId/cancel", authenticate, orderController.cancelledOrders);
router.get("/:orderId/delete", authenticate, orderController.deleteOrders);

module.exports = router;