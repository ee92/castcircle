import React, { Component } from 'react'
import Sidebar from './Sidebar'
import { db } from './../firebase'

class Home extends Component {

  handleClick = () => {
    db.collection('users').doc(this.props.state.user.uid).get().then((user) => {
      db.collection('circles').doc(user.data().lastCircle).collection('broadcasts').add({}).then((broadcast) => {
        window.location.pathname = "/broadcast/" + broadcast.id
      })
    })
  }

  render() {
    return (
      <div>
        <Sidebar user={this.props.state.user}/>
        <div style={{marginLeft: '300px'}}>
          <button onClick={this.handleClick}>test</button>
        </div>
      </div>
    )
  }
}

export default Home
