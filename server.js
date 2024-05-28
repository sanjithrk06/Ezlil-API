require('dotenv').config()

const express = require('express')
const path = require('path'); 
const mongoose = require('mongoose')
const productsRoutes = require('./routes/products')
const customersRoutes = require('./routes/customers')
const userRoutes = require('./routes/user')
const cors = require('cors')  

//express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//routes
app.use('/api/products', productsRoutes)

//user
app.use('/api/user', userRoutes)

//customers
app.use('/api/customers', customersRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log('connected to database')
        //listen to port
        app.listen(process.env.PORT, ()=>{
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })