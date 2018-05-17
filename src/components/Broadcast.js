import React, { Component } from 'react'
import { db } from './../firebase'
import { agora } from './../agora.js'
import { Icon, IconButton } from 'material-ui'

class Broadcast extends Component {

  leaveStream = () => {
    console.log("leaving")
  }

  componentDidMount() {
    let video = document.getElementById('agora').innerHTML
    let channelId = window.location.pathname.split('/').pop()
    db.collection('users').doc(this.props.state.user.uid).get().then((user) => {
      db.collection('circles').doc(user.data().lastCircle).collection('broadcasts').get().then((broadcasts) => {
        broadcasts.forEach((broadcast) => {
          if (channelId === broadcast.id && video === "") {
            agora(channelId, false)
            return
          }
        })
        if (video === "") {
          agora(channelId, true)
          return
        }
      })
    })
  }

  render() {

    const styles = {
      video: {
        width: '100%',
        height: window.innerHeight,
        display: 'inline-block'
      },
      controls: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        color: 'white',
        padding: "5px"
      }
    }

    return (
      <div>
        <div id="agora" style={styles.video}></div>
        <div style={styles.controls}>
          <IconButton color="inherit" onClick={this.leaveStream}>
            <Icon color="inherit">backspace</Icon>
          </IconButton>
          <IconButton color="inherit">
            <Icon color="inherit">message</Icon>
          </IconButton>
          <IconButton color="inherit">
            <Icon color="inherit">star</Icon>
          </IconButton>
        </div>
      </div>
    )
  }
}

export default Broadcast
