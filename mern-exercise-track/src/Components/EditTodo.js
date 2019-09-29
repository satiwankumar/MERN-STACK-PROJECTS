import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

import React, { Component } from 'react'


class EditTodo extends Component {
    constructor(props){
        super(props);
        this.state={
            todo_description : '',
            todo_responsible : '',

            todo_priority : '',
            todo_completed : false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4002/todos/'+this.props.match.parents.id)
            .then(response =>{
               this.setState({
                   todo_description : response.todo_description,
                   todo_responsible : response.todo_responsible,
                   todo_priority : response.todo_priority,
                   todo_completed : response.todo_completed
               })
            }).catch(function(error){
                console.log(error)
            })
    }






    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default EditTodo




