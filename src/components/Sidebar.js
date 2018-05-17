import React from 'react'
import Logout from './Logout'
import { db } from './../firebase'
import { withStyles } from 'material-ui/styles'
import { Drawer } from 'material-ui'

const styles = {
  drawerPaper: {
    width: '300px',
    background: 'rgb(48,0,50)'
  }
}

class Sidebar extends React.Component {

  state = {
    circles: [],
    channels: [],
    people: []
  }

  getCircles() {
    db.collection('users').doc(this.props.user.uid).collection('circles').get().then((circles) => {
      circles.forEach((circle) => {
        db.collection('circles').doc(circle.id).get().then((name) => {
          let circles = this.state.circles
          circles.push(name.data().circleName)
          this.setState({circles})
        })
      })
    })
  }

  getChannels() {
    db.collection('users').doc(this.props.user.uid).get((user) => {
      console.log(user.data().lastCircle)
    })
  }

  componentDidMount() {
    this.getCircles()
    this.getChannels()
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className="flex text-white">
            <Logout/>
            <div>
              <h4>Logo</h4>
            </div>
            <div className="v-center">
              <div>
                <div>
                  <h4>Circles</h4>
                  {this.state.circles.map((circle, i) => {
                    return <p key={i}><a href='/'>{circle}</a></p>
                  })}
                </div>
                <div>
                  <h4>Channels</h4>
                  general
                </div>
                <div>
                  <h4>People</h4>
                  <p>ravi</p>
                  <p>misha</p>
                  <p>thomas</p>
                </div>
              </div>

            </div>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(Sidebar)

// const Sidebar = ({ classes }) => (
//   <Drawer
//     variant="permanent"
//     classes={{
//       paper: classes.drawerPaper,
//     }}
//   >
//
//     <div className="flex text-white">
//       <Logout/>
//       <div>
//         <h4>Logo</h4>
//       </div>
//       <div className="v-center">
//         <div>
//           <div>
//             <h4>Circles</h4>
//             test
//           </div>
//           <div>
//             <h4>Channels</h4>
//             general
//           </div>
//           <div>
//             <h4>People</h4>
//             <p>ravi</p>
//             <p>misha</p>
//             <p>thomas</p>
//           </div>
//         </div>
//
//       </div>
//     </div>
//   </Drawer>
// )
//
// export default withStyles(styles)(Sidebar)
