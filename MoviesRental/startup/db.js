

const mongoose = require('mongoose')
module.exports = function(){
mongoose.connect("mongodb://localhost:27017/vidly", {useNewUrlParser: true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology: true})
     .then(()=>console.log('mongo db connected'))
     .catch(err=>console.error('Couldnot connect to mongo db '))

    }

