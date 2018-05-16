import React, { Component } from 'react'
import { auth, uiConfig } from './../firebase'
import Logout from './Logout'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Grid from 'material-ui/Grid'

class Login extends Component {

  render() {
    return (
      <Grid container className="root bg-black">
        <Grid item xs={12} md={4} className="text-white bg-purple">
          <div className="flex">
            <div>
              <Logout/>
              <a href='/'><h5>CASTCIRCLE</h5></a>
              <h3><b>Create Account</b></h3>
            </div>
            <div className="v-center h-center">
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={auth}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default Login
