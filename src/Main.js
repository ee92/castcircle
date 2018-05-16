import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { auth } from './firebase'
import Login from './components/Login'
import CreateCircle from './components/CreateCircle'
import InvitePeople from './components/InvitePeople'
import Home from './components/Home'

class Main extends Component {

  state = {
    user: null,
    pending: true
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({
        user: user,
        pending: false
      })
    })
  }

  render() {
    return (
      <Router>
         <Switch>
           <PrivateRoute state={this.state} path="/create-circle" exact component={CreateCircle}/>
           <PrivateRoute state={this.state} path="/invite-people" exact component={InvitePeople}/>
           <PrivateRoute state={this.state} path="/" exact component={Home}/>
           <Route path="/login" exact component={Login}/>
           <Route render={() => {
             if (this.state.pending) return null
             return this.state.user
             ? (<Redirect to="/"/>)
             : (<Redirect to="/login"/>)
           }}/>
         </Switch>
      </Router>
    )
  }
}

export default Main
