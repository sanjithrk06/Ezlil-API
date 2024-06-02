const mongoose = require("mongoose");
const Customer = require("../models/userModel");

// GET all the customers
const getCustomers = async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });

  if (customers.length == 0) {
    return res.status(200).json({ message: "No customers found" });
  }

  res.status(200).json(customers);
};

//get a single customer
const getCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such customer found" });
  }

  const customer = await Customer.findById(id);

  if (!customer) {
    return res.status(404).json({ error: "No such customer found" });
  }

  res.status(200).json(customer);
};

//get a single customer by email
const getCustomerByEmail = async (req, res) => {
  const { email } = req.params;

  const customer = await Customer.findOne({ email: email });

  if (!customer) {
    return res.status(404).json({ error: "No such customer found" });
  }

  res.status(200).json(customer);
};

//update a customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such customer found" });
  }

  const customer = await Customer.findByIdAndUpdate(id, {
    ...req.body,
  });

  if (!customer) {
    return res.status(404).json({ error: "No such customer found" });
  }

  res.status(200).json(customer);
};

// delete a customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such customer found" });
  }

  const customer = await Customer.findByIdAndDelete(id);

  if (!customer) {
    return res.status(404).json({ error: "No such customer found" });
  }

  res.status(200).json(customer);
};

module.exports = {
  getCustomers,
  getCustomer,
  getCustomerByEmail,
  updateCustomer,
  deleteCustomer,
};
