import * as firebase from 'firebase'
import 'firebase/firestore'

const dbConfig = {
  apiKey: "AIzaSyBCe4vVr8zSj1tKboKzWSrrzqJ5FKn9cEY",
  authDomain: "castcircle-ffcca.firebaseapp.com",
  databaseURL: "https://castcircle-ffcca.firebaseio.com",
  projectId: "castcircle-ffcca",
  storageBucket: "castcircle-ffcca.appspot.com",
  messagingSenderId: "701101582487"
}
firebase.initializeApp(dbConfig)

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    'signInSuccessWithAuthResult': function(authResult) {
      firebase.firestore().collection('users')
      .doc(authResult.user.uid).collection('circles')
      .get().then(function(circles) {
        if (circles.docs.length === 0) {
            window.location.pathname = '/create-circle'
        } else {
            window.location.pathname = '/'
        }
      })
      return false
    }
  }
}

const auth = firebase.auth()
const db = firebase.firestore()
const settings = {timestampsInSnapshots: true}
db.settings(settings)

export { firebase, uiConfig, auth, db }
