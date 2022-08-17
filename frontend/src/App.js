import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";

import UserList from './components/Users';
import ProjectList from "./components/Projects";
import ProjectTodoList from "./components/ProjectTodo";
import TodoList from "./components/ToDoS";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";


import {HashRouter, BrowserRouter, Route, Link, Switch} from "react-router-dom";


class App extends React.Component {

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
        return (
            <div>
                <Menu menu/>

                <HashRouter>
                    <nav>
                        <ul>
                            <li><Link as={Link} to='/'> Projects </Link></li>
                            <li><Link as={Link} to='/todos'> Todos </Link></li>
                            <li><Link as={Link} to='/users'> Users </Link></li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route exact path='/' component={() => <ProjectList items={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() => <TodoList items={this.state.todos}/>}/>
                        <Route exact path='/users/' component={() => <UserList items={this.state.users}/>}/>

                        <Route exact path='/project/:id' component={() => <ProjectTodoList items={this.state.todos}/>}/>

                        <Route component={NotFound404}/>
                    </Switch>
                </HashRouter>
                <Footer footer/>
            </div>
        )
    }
}

export default App;
