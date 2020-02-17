//importing api's
const express = require('express')
const Genres = require('../routes/genres')
const Customers = require('../routes/customer')
const Movies = require('../routes/movies')
const Rental = require('../routes/rental')
const Users = require('../routes/users')
const Auth = require('../routes/auth')
const error = require('../middleware/error')


module.exports = function(app){
//look for dependency
//Middlware
app.use(express.json())
app.use('/api/genres',Genres)
app.use('/api/customers',Customers)
app.use('/api/movies',Movies)
app.use('/api/rentals',Rental)
app.use('/api/users',Users)
app.use('/api/auth',Auth)

app.use(error)


}