import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from './components/Users';
import axios from "axios";


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {'users': []}
  }

  componentDidMount() {
    const users = [];
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
          <UserList users={this.state.users}/>
        </div>
    )
  }
}

export default App;
