const express = require('express')
const router = express.Router()


const {Customer,validateCustomer} = require('../models/customer')

router.get('/',async (req,res)=>{
  
    const customers = await Customer.find().sort('name')
    if(!customers) return res.status(404).send('could not find the genres')
    res.send(customers)

})

router.post('/',async (req,res)=>{

    //validate inputs[0]
    const {error} = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const {isGold,name ,phone} = req.body
   const customer=  new Customer({
    isGold :isGold,
    name : name, 
    phone : phone

    })
    await customer.save();
res.send(customer)

})

router.get('/:id',async (req,res)=>{

    
    const id  = req.params.id
    const customer = await Customer.findById(id)
    if(!customer)return res.status(404).send('Id not found')
    res.send(customer)
})



router.delete('/:id',async (req,res)=>{
  
    let customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer)return res.status(404).send('Id not found')

    customer = await customer.remove()
    res.send(customer)
})

router.put('/:id',async (req,res)=>{
    const {error} = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let customer =  await Customer.findByIdAndUpdate(req.params.id)
    if(!customer)return res.status(404).send('Id not found')

    customer.name = req.body.name
    customer.phone = req.body.phone

    customer = await customer.save()
    res.send(customer)
})




module.exports =router