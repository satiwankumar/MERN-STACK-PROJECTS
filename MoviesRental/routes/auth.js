const {User}=require('../models/users')
const Joi = require('joi')
const _ = require('lodash')
const express= require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config =require('config')
const router = new express.Router() 





 
router.post('/',async (req,res)=>{

    const {error} = validateLogin(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user =await User.findOne({email : req.body.email})
    if(!user) res.status(404).send('Invalid login Credentials')

    const validpassword = await bcrypt.compare(req.body.password,user.password)
    if(!validpassword) return res.status(400).send('Invalid login Credentials')

    const token  =  user.generateAuthToken()
    res.send(token)
    
  }) 


function validateLogin(user) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }





module.exports = router