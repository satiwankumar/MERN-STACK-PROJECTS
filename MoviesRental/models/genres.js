const mongoose = require('mongoose')
const Joi = require('Joi')



const genreSchema  = new  mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }

})



const Genre = new mongoose.model('Genre',genreSchema)

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).max(50).required()
    }
    return Joi.validate(genre,schema)
}


module.exports.genreSchema = genreSchema;

module.exports.Genre = Genre;
exports.validate = validateGenre