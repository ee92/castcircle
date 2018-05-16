import React from "react"
import {
  Route,
  Redirect
} from "react-router-dom"

class PrivateRoute extends React.Component {

  render() {
    const { component: Component, state } = this.props
    return (
      <Route render={(props) => {
        if (state.pending) return null
        return state.user
          ? <Component {...props} state={state} />
          : <Redirect to="/login"/>
      }}/>
    )
  }
}

export default PrivateRoute
