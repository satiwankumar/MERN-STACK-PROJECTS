const {Rental,validate} = require('../models/Rental')
const {Movie} = require('../models/movies'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose')
const express = require('express')
const router = new express.Router()


router.get('/',async (req,res)=>{
    const rental =await  Rental.find().sort('name')
    if(rental.length<0) return res.send(404).send('no record found')

    return res.send(rental)
})

router.post('/',async (req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)


     

    const customer =await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send('Invalid customer.');


  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');



  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');


  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
    
  });
  rental = await rental.save();

  movie.numberInStock--;
  movie.save();
  
  res.send(rental);

  

})

router.get('/:id',async (req,res)=>{
    const rental = await Rental.findById(req.params.id)
    if(!rental) return res.status(404).send('id not found')
    res.send(rental)
})

module.exports= router