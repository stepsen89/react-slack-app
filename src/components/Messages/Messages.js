import React, { Component, Fragment } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    currentUser: this.props.currentUser,
    progressBar: false
  }

  componentDidMount() {
    const { channel, currentUser } = this.state;
    if (channel && currentUser) {
      this.addListeners(channel.id);
      console.log("channel and user");
      console.log(this.state.messages);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);

  }

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      })
    })
  }

  isProgressBarVisible = percent => {
    percent < 100 && this.setState({ progressBar: true })
  }

  displayMessages = messages => (
    messages.length > 0 && messages.map(message => (
      <Message key={message.timeStamp} message={message} user={this.state.currentUser} />
    ))
  )

  displayChannelName = channel => channel ? `${channel.name}` : "";


  render() {
    const { messagesRef, channel, messages, currentUser, progressBar } = this.state;

    return (
      <Fragment>
        <MessagesHeader channelName={this.displayChannelName(channel)} />
        <Segment>
          <Comment.Group className={progressBar ? "messages__progress" : "messages"}>
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm messagesRef={messagesRef} currentChannel={channel} currentUser={currentUser} isProgressBarVisible={this.isProgressBarVisible} />
      </Fragment>
    )
  }
}

export default Messages
