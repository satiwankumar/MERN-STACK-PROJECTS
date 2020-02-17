const mongoose = require('mongoose')
const Joi = require('Joi')

const Customer = new mongoose.model('Customer',new mongoose.Schema({

    isGold : {
        type: Boolean,
        default : true
    },
    name : {
        type:String,
        required:true,
        minlength :3,
        maxlength : 50
    },
    phone : {
        type:String,
        required : true,
    

    }






}))


function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone : Joi.string()

    }
    return Joi.validate(customer,schema)
}




module.exports.Customer = Customer
module.exports.validateCustomer = validateCustomer