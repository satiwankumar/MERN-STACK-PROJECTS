import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';

import CreateTodo from './Components/CreateTodo'
import TodosList from './Components/TodosList'
import EditTodo from './Components/EditTodo'
import {BrowserRouter ,Route,Link,Switch} from 'react-router-dom'

import logo from  './download.jfif'
class App extends Component {

        

  render() {
    return (
      <BrowserRouter>
        <div  >
                 <nav className="navbar navbar-expand-sm  bg-dark navbar-dark">
                              
                              <a className="navbar-brand" href="https://www.facebook.com/satiwan.kumar.3">SK Todo</a>
                            
                              
                              <ul className="navbar-nav">
                                <li className="nav-item">
                                  <Link to="/create" className="nav-link" href="#">Create</Link>
                                </li>
                                <li className="nav-item">
                                  <Link to="/edit/:id" className="nav-link" href="#">Edit</Link>
                                </li>
                                <li className="nav-item">
                                <Link to="/" className="nav-link" href="#">TodosList</Link>
                              </li>
                            
                              
                                
                              </ul>
                            </nav>

            
                                  <div className="container">
                                  <Switch>
                                      <Route path="/create" component={CreateTodo}/>
                                    <Route path="/edit/:id" component={EditTodo}/>
                                    <Route  path="/" component={TodosList}/>
                                    </Switch>
                                    </div>      
          
         
          </div>
       

      </BrowserRouter>
    )
  }
}




export default App;
