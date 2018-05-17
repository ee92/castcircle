import React, { Component } from 'react'
import Logout from './Logout'
import { Grid, Button  } from 'material-ui'

class InvitePeople extends Component {

  handleSkip = () => {
    window.location.pathname = "/"
  }

  render() {
    return (
      <Grid container className="root bg-gray">
        <Grid item xs={12} md={4} className="text-white bg-blue">
          <div className="flex">
            <div>
              <div>
                <Logout/>
                <a href='/'><h5>CASTCIRCLE</h5></a>
                <h3><b>Invite People</b></h3>
              </div>
              <div className="">
                <Button onClick={this.handleSkip}>SKIP</Button>
              </div>
            </div>
            <div className="v-center h-center">
              <div className="">
                <div>
                  <input className="form-check-input" type="checkbox" />
                  <span>Anyone with @apple.com email can join</span>
                </div>
                <div>
                  <input className="material-input" placeholder=" Email Address" />
                  <input className="material-input" placeholder=" Email Address" />
                  <input className="material-input" placeholder=" Email Address" />
                  <input className="material-input" placeholder=" Email Address" />
                </div>
                <div className="my-5">
                  <button className="btn btn-outline-light float-right">DONE</button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default InvitePeople
