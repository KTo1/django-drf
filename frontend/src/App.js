import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";

import UserList from './components/Users';
import ProjectList from "./components/Projects";
import TodoList from "./components/ToDoS";
import Menu from "./components/Menu";
import Footer from "./components/Footer";


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        'users': [],
        'projects': [],
        'todos': []
    }
  }

  componentDidMount() {
      
    axios.get('http://127.0.0.1:8000/api/users/').then(response => {
        this.setState(
            {
             'users': response.data['results']
        })
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
        this.setState(
            {
             'projects': response.data['results']
        })
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todos/').then(response => {
        this.setState(
            {
             'todos': response.data['results']
        })
    }).catch(error => console.log(error))

  }

  render() {
    return(
        <div>
            <Menu menu/>
            <UserList users={this.state.users}/>
            <ProjectList projects={this.state.projects}/>
            <TodoList todos={this.state.todos}/>
            <Footer footer/>
        </div>
    )
  }
}

export default App;
