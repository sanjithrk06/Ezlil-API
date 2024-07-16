const cartService = require("../services/cart.service");
const mongoose = require("mongoose");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItems.model");

async function createOrder(user, shippAddress) {
  console.log('User:', user);
  console.log('Shipping Address:', shippAddress);

  let address;

  console.log('outside if');
  // Check if the shipping address exists, if not create a new one
  if (shippAddress._id) {
    console.log('inside if');
    address = await Address.findById(shippAddress._id);
    if (!address) {
      throw new Error('Address not found');
    }
  } else {
    console.log('inside else');
    address = new Address(shippAddress);
    address.user = user._id; // Ensure user ID is set
    await address.save();
    console.log('after new');
    
    user.address.push(address._id); // Push the address ID to the user's addresses
    await user.save();
  }

  console.log('outside if');
  const cart = await cartService.findUserCart(user._id);
  console.log('Cart:', cart);

  if (!cart || !cart.cartItems) {
    throw new Error('Cart not found or empty');
  }

  const orderItems = [];
  console.log('Cart Items:', cart.cartItems);

  // Loop through the cart items and create order items
  for (const item of cart.cartItems) {
    console.log('Processing Cart Item:', item);

    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      user: user._id, // Ensure user ID is set
      discountedPrice: item.discountedPrice,
    });

    try {
      const createdOrderItem = await orderItem.save();
      console.log('Created Order Item:', createdOrderItem);
      orderItems.push(createdOrderItem._id); // Push the order item ID to the orderItems array
    } catch (error) {
      console.error('Error saving Order Item:', error);
      throw error;
    }
  }

  console.log('Order Items:', orderItems);

  if (orderItems.length === 0) {
    throw new Error('No valid order items created');
  }

  // Create the order with the order items and other details
  const createdOrder = new Order({
    user: user._id, // Store the user ID in the order
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: cart.discount,
    totalItems: cart.totalItems,
    shippingAddress: address._id, // Store the address ID in the order
  });

  try {
    const savedOrder = await createdOrder.save();
    console.log('Saved Order:', savedOrder);
    return savedOrder;
  } catch (error) {
    console.error('Error saving Order:', error);
    throw error;
  }
}


async function placeOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";

  return await order.save();
}

async function cancelOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({
      path: "orderItems",
      populate: { path: "product" },
    })
    .populate("shippingAddress");

  return order;
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);

  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
