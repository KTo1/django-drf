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
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie";


import {HashRouter, BrowserRouter, Routes, Route, Navigate, Link} from "react-router-dom";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    is_auth() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookie = new Cookies;
        const token = cookie.get('token');
        this.setState({'token': token})
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password}).then(response => {
            console.log(response.data)
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль!'))
    }

    set_token(token) {
        const cookie = new Cookies;
        cookie.set('token', token);
        this.setState({'token': token})
    }

    load_data() {
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

    componentDidMount() {
        this.get_token_from_storage();
        this.load_data();
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
                            <li> {this.is_auth() ? <button
                                    onClick={() => this.logout()}>Logout</button> :
                                <Link as={Link} to='/login'>Login</Link>}</li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route exact path='/' element={<Navigate to='/projects'/>}/>
                        <Route exact path='/todos' element={<TodoList items={this.state.todos}/>}/>
                        <Route exact path='/users/' element={<UserList items={this.state.users}/>}/>
                        <Route exact path='/login/' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>

                        <Route path='/projects'>
                            <Route index element={<ProjectList items={this.state.projects}/>}/>
                            <Route path='project/:projectId' element={<ProjectTodoList items={this.state.todos}/>}/>
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
