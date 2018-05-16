import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Grid from 'material-ui/Grid'

class Home extends Component {

  render() {
    return (
      <Sidebar user={this.props.state.user}/>
    )
  }
}

export default Home
