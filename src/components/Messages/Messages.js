import React, { Component, Fragment } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
    channel: this.props.currentChannel,
    currentUser: this.props.currentUser
  }

  componentDidMount() {
    const { channel, currentUser } = this.state;
    if (channel && currentUser) {
      this.addListeners(channel.id);
      console.log("channel and user")
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);

  }

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      console.log(loadedMessages);
    })
  }


  render() {
    const { messagesRef, channel, currentUser } = this.state;

    return (
      <Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group className="messages">

          </Comment.Group>
        </Segment>
        <MessageForm messagesRef={messagesRef} currentChannel={channel} currentUser={currentUser} />
      </Fragment>
    )
  }
}

export default Messages
