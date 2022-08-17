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


import {HashRouter, BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";


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

                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link as={Link} to='/'> Projects </Link></li>
                            <li><Link as={Link} to='/todos'> Todos </Link></li>
                            <li><Link as={Link} to='/users'> Users </Link></li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route exact path='/' element={<Navigate to='/projects' />}/>
                        <Route exact path='/todos' element={<TodoList items={this.state.todos}/>}/>
                        <Route exact path='/users/' element={<UserList items={this.state.users}/>}/>

                        <Route path='/projects'>
                            <Route index element={<ProjectList items={this.state.projects} />} />
                            <Route path='project/:projectId' element={<ProjectTodoList items={this.state.todos} />} />
                        </Route>

                        <Route path='*' element={NotFound404}/>
                    </Routes>
                </BrowserRouter>
                <Footer footer/>
            </div>
        )
    }
}

export default App;
