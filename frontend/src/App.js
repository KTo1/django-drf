import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";

import UserList from './components/Users';
import Menu from "./components/Menu";
import Footer from "./components/Footer";


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {'users': []}
  }

  componentDidMount() {
      
    axios.get('http://127.0.0.1:8000/api/usersapp/').then(response => {
        this.setState(
            {
             'users': response.data
        })
    }).catch(error => console.log(error))

  }

  render() {
    return(
        <div>
            <Menu menu/>
            <UserList users={this.state.users}/>
            <Footer footer/>
        </div>
    )
  }
}

export default App;
