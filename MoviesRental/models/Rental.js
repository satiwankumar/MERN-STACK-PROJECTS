const Joi = require('joi')

const mongoose = require('mongoose')
const movieSchema = require('../models/movies')
const customerSchema = require('../models/customer')
const rentalSchema = new mongoose.Schema({
    
    customer:{
        type:customerSchema,
        required:true
    },
    movie:{
      type:movieSchema,
      
  }, 
  
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  rentalFee: { 
    type: Number, 
    min: 0
  }

})
const Rental = new mongoose.model('Rental',rentalSchema)

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;
