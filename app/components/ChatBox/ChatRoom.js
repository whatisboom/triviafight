import React, { Component } from 'react'
import firebase from 'firebase'
import Header from './Header'
import ChatMessageList from './ChatMessageList'

class ChatRoom extends Component {
  constructor () {
    super()
    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.messagesDBUL = firebase.database().ref(`userlist/`)
  }

  state = {
    user: null
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  handleAuth () {
    const provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        console.log(`${result.user.displayName} has started a session.`)
        let newUserAdded = this.messagesDBUL.push()
        let msg = result.user.displayName
        newUserAdded.set(msg)
      })
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log('There was a disconnect'))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  renderMessages () {
    if (this.state.user) {
      return <ChatMessageList user={this.state.user} />
    } else {
      return <div>You need to Log In to see the Messages.</div>
    }
  }

  render () {
    return (
      <div className='5'>
        <Header
          appName='Trivia Fight'
          user={this.state.user}
          onAuth={this.handleAuth}
          onLogout={this.handleLogout}
        />
      <div className=''>
          <div className='4'>
            {this.renderMessages()}
          </div>
        </div>

      </div>
    )
  }
}

export default ChatRoom
