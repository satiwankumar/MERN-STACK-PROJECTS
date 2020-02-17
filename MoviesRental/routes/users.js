
const express= require('express')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const router = new express.Router() 

const {User,validate}=require('../models/users')

const jwt = require('jsonwebtoken')
const config = require('config')


router.get('/',async (req,res)=>{
  
    const user = await User.find().sort('name')
    if(user.length<=0) return res.status(404).send('could not find the user')
    res.send(user)

})


 
router.post('/',async (req,res)=>{

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user =await User.findOne({email : req.body.email})
    if(user) res.status(400).send('User already registered')

    //lodash
    
    user = new User(_.pick(req.body,['name','email','password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    
    const token  = await user.generateAuthToken()

    
    await user.save()
    res.header('x_auth_token',token).send(_.pick(req.body,['name','email']))
//    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email','password']))
}) 
module.exports = router