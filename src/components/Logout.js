import React, { Component } from 'react'
import { auth } from './../firebase'
import Button from 'material-ui/Button'

class Logout extends Component {

  logout() {
    auth.signOut()
    window.location.pathname = '/login'
  }

  render() {
    return (
      <Button onClick={this.logout} color="primary">
        LOG OUT
      </Button>
    )
  }
}

export default Logout
