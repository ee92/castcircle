import React, { Component } from 'react'
import { db } from './../firebase'
import Logout from './Logout'
import { Redirect } from 'react-router-dom'
import { Grid, Button, Checkbox } from 'material-ui'

class CreateCircle extends Component {

  state = {
    input: '',
    checkbox: false,
    circleError: true
  }

  createCircle = () => {
    let data = {
      uid: this.props.state.user.uid,
      email: this.props.state.user.email
    }
    db.collection('users').doc(this.props.state.user.uid).collection('circles').add({}).then((circle) => {
      console.log("write success")
      db.collection('circles').doc(circle.id).set({
        circleName: this.state.input,
        creatorBroadcastOnly: this.state.checkbox,
        creatorId: this.props.state.user.uid
      })
      db.collection('circles').doc(circle.id).collection('channels').add({
        channelName: "General"
      }).then((channel) => {
        db.collection('circles').doc(circle.id).collection('channels').doc(channel.id)
        .collection('members').doc(this.props.state.user.uid).set({
          userId: this.props.state.user.uid,
          email: this.props.state.user.email
        })
      })
      db.collection('circles').doc(circle.id).collection('members').doc(this.props.state.user.uid).set({
        userId: this.props.state.user.uid,
        email: this.props.state.user.email
      })
    })
  }

  isCircleUnique = () => {
    this.setState({circleError: null})
    db.collection('circles').get().then((circles) => {
      circles.forEach((circle) => {
        if (this.state.input == circle.data().circleName) {
          this.setState({circleError: "circle already exists"})
        }
      })
    })
  }

  handleInput = (e) => {
    this.setState({input: e.target.value})
    this.isCircleUnique()
  }

  handleCheck = () => {
    this.setState({checkbox: !this.state.checkbox})
  }

  handleClick = () => {
    this.createCircle()
  }

  render() {
    console.log(this.props.state.user.uid)
    return (
      <Grid container className="root bg-gray">
        <Grid item xs={12} md={4} className="text-white bg-red">
          <div className="flex">
            <div>
              <Logout/>
              <a href='/'><h5>CASTCIRCLE</h5></a>
              <h3><b>Create Circle</b></h3>
              <h6>A circle is your overall organization or group</h6>
            </div>
            <div className="v-center h-center">
              <div>
                <input id="circleName" dir="rtl"
                  className="material-input"
                  value={this.state.input}
                  onChange={e => this.handleInput(e)}
                 />
                <span>.castcircle.com</span>
                <p>{this.state.circleError}</p>
                <div>
                  <Checkbox
                    id="creatorBroadcastOnly"
                    color="primary"
                    checked={this.state.checkbox}
                    onChange={this.handleCheck}
                  />
                  <span>Allow only me to live broadcast</span>
                  <p>(you might want to do this if you are a teacher)</p>
                </div>
                <Button id="createCircleButton" onClick={this.handleClick} disabled={!!this.state.circleError}>
                  DONE
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default CreateCircle
