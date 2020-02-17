require('express-async-errors')

const config= require('config')
const Joi= require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const express = require('express')
const app = express()


//importing all routes
require('./startup/routes')(app)
//connect db
require('./startup/db')();


const port = process.env.port||5000

app.listen(port, (req,res)=>{
     console.log(`app running at the port ${port}`)
})

