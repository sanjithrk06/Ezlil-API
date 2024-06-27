require('dotenv').config();
const app = require("./index");
const { connectDb } = require("./config/db");

app.listen(process.env.PORT, async()=> {
    console.log("App is listening on the port :", process.env.PORT);
    await connectDb();
    console.log("Connected to the DB");
})