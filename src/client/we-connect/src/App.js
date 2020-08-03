import React, { Component } from 'react';
import UserContext from './Context'
import Spinner from './components/spinner';
import getCookie from './utils/cookie';
import userService from './services/user-service';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: null,
      user: null
    }
  }

  logIn = (user) => {
    this.setState({
      loggedIn: true,
      user
    })
  }

  logOut = () => {
    document.cookie = "x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    this.setState({
      loggedIn: false,
      user: null
    })
  }

  checkToken = async () => {
    const token = getCookie('x-auth-token')
    
    if (!token) {
      this.logOut()
      return
    }

    const response = await userService.verifyToken(token)
    
    if (response.status) {
      this.logIn({
        id: response.id,
        username: response.username
      })
    } else {
      this.logOut()
    }
  }

  componentDidMount() {
    this.checkToken()
  }

  render() {
    const {
      loggedIn,
      user
    } = this.state

    if (loggedIn === null) {
      return (
        <Spinner />
      )
    }
    
    return (
      <UserContext.Provider value={{
        loggedIn,
        user,
        logIn: this.logIn,
        logOut: this.logOut
      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default App;
