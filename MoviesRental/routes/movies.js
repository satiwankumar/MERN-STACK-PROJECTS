


const {Movie,validate} = require('../models/movies')
const {Genre} = require('../models/genres')
const express = require('express')
const router = express.Router()

router.get('/',async (req,res)=>{
  
    const movies = await Movie.find().sort('name')
    if(movies.length<=0) return res.status(404).send('could not find the movies')
    res.send(movies)

})


router.post('/',async(req,res)=>{ 
    
   const {error }=  validate(req.body)
  if(error) return res.status(500).send(error.details[0].message)


    const genre = await Genre.findById(req.body.genreId)
    console.log(genre)
    if(!genre) return res.status(400).send('Invalid Genre')

   const movie= new Movie({
       title : req.body.title,
       genre : {
           _id : genre._id,
           name:genre.name
       },
       numberInStock : req.body.numberInStock,
       dailyRentalRate : req.body.dailyRentalRate
   })
    await movie.save()
   res.send(movie)
   
})





module.exports =router
