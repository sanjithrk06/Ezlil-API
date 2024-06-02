const express = require("express");
const {
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
} = require("../controllers/customersController");

const router = express.Router();

// GET all the customers
router.get("/", getCustomers);

// GET a single customer
router.get("/:id", getCustomer);

// GET a single customer by email
router.get("/email/:email", getCustomerByEmail);

// UPDATE a customer
router.patch("/:id", updateCustomer);

// DELETE a customer
router.delete("/:id", deleteCustomer);

module.exports = router;
