require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const productsRoutes = require('./routes/products')
const userRoutes = require('./routes/user')

//express app
const app = express()
app.use(cors());
// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/products', productsRoutes)

//user
app.use('/api/user', userRoutes)

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