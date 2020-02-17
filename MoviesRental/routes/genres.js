require('express-async-errors')
const mongoose = require('mongoose')
const {Genre,validate} = require('../models/genres')
const express = require('express')
const router =new  express.Router()
const auth= require('../middleware/auth')
const admin= require('../middleware/admin')


router.get('/', async (req,res,next)=>{


    const genres = await Genre.find().sort('name')
    if(!genres) return res.status(404).send('could not find the genres')
    res.send(genres)
})

router.post('/',auth,async (req,res)=>{

    //validate inputs[0]
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
   const genre=  new Genre({
            name: req.body.name
    })
     await genre.save();
res.send(genre)

})

router.get('/:id',async (req,res)=>{

    
    const id  = req.params.id
    const genre = await Genre.findById(id)
    if(!genre)return res.status(404).send('Id not found')
    res.send(genre)
})



router.delete('/:id',[auth,admin],async (req,res)=>{
  
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre)return res.status(404).send('Id not found')

    const a = await genre.remove()
    res.send(genre)
})


router.put('/:id',auth,async (req,res)=>{
    const {error} = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let genre =  await Genre.findByIdAndUpdate(req.params.id)
    if(!genre)return res.status(404).send('Id not found')

    genre.name = req.body.name
    genre = await genre.save()
    res.send(genre)
})




module.exports =router