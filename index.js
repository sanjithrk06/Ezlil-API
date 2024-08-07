const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/api", (req, res)=> {
    return res.status(200).send({message: "Welcome to the Ezlil", status:true});
})

const authRouters = require("./routes/auth.route")
app.use("/auth", authRouters);

const userRouters = require("./routes/user.route")
app.use("/api/users", userRouters);

const productRouter = require("./routes/product.route");
app.use("/api/products", productRouter);

const adminProductRouter = require("./routes/adminProduct.route");
app.use("/api/admin/products", adminProductRouter);

const orderRouter = require("./routes/order.route");
app.use("/api/order", orderRouter);

const adminOrderRouter = require("./routes/adminOrder.route");
app.use("/api/admin/order", adminOrderRouter);

const categoryRouter = require("./routes/category.route");
app.use("/api/category", categoryRouter);

const cartRouter=require("./routes/cart.route");
app.use("/api/cart",cartRouter);

const cartItemRouter=require("./routes/cartItem.route");
app.use("/api/cartItem",cartItemRouter);

module.exports = app;