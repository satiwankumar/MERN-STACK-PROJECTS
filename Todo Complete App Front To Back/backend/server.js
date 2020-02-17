const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 4002
const mongoose = require('mongoose');
let Todo = require('./todo.model');
const todoRoutes = express.Router();


app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/todos',{useNewUrlParser : true})
const connection = mongoose.connection;

connection.once('open',function(){
    console.log("Mongo database connection established Successfully ")
})


todoRoutes.route('/').get(function(req,res){

    Todo.find(function(err,todos){
        if(err){
            console.log(err)
        }else{
            res.json(todos)
        }
    });
});

todoRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Todo.findById(id,function(err,todo){
        res.json(todo);
    });

});
todoRoutes.route('/add').post(function(req,res){
    let todo = new Todo(req.body);
    todo.save()
        .then(todo =>{
            res.status(200).json({'todo':'todo added Successfully'})
        })
        .catch(err=>{
            res.status(400).send('Adding new Todo failed')
        })

})
todoRoutes.route('/update/:id').post(function(req,res){
    Todo.findById(req.params.id,function(err,todo){
        if(!todo){
            res.status(404).send('data is not found')

        }
        else{
            todo.todo_description =req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then(todo =>{
                res.json('Todo Updated');
 
            })
            .catch(err=>{
                res.status(400).send("Updated not possible")
            })
        }
    })
})



app.use('/todos',todoRoutes);
app.get('/',(req,res)=>{
    res.send('This is Home ')
})


app.listen(port,()=>{
    console.log("Server is Running on port "+port)
})

