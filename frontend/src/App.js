import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";

import UserList from './components/Users';
import ProjectList from "./components/Projects";
import TodoList from "./components/ToDoS";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";


import {HashRouter, Route, Link, Switch} from "react-router-dom";


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
                            <li><Link to='/users'> users/ </Link></li>
                            <li><Link to='/projects'> projects/ </Link></li>
                            <li><Link to='/todos'> todos/ </Link></li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route exact path='/users/' component={() => <UserList items={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList items={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() => <TodoList items={this.state.todos}/>}/>

                        <Route component={NotFound404}/>
                    </Switch>
                </HashRouter>
                <Footer footer/>
            </div>
        )
    }
}

export default App;
