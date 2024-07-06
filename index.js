const express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

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

const categoryRouter = require("./routes/category.route");
app.use("/api/category", categoryRouter);

module.exports = app;