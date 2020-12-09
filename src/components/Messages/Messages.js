import React, { Component, Fragment } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';

class Messages extends Component {
  state = {
    privateChannel: this.props.isPrivateChannel,
    privateMessagesRef: firebase.database().ref('privateMessages'),
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    currentUser: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    progressBar: false,
    isChannelStarred: false,
    numUniqueUsers: '',
    searchTerm: '',
    searchLoading: false,
    searchResults: []
  }

  componentDidMount() {
    const { channel, currentUser } = this.state;
    if (channel && currentUser) {
      this.addListeners(channel.id);
      this.addUserStarsListener(channel.id, currentUser.uid)
    }
  }

  addUserStarsListener = (channelId, userId) => {
    this.state.usersRef
      .child(userId)
      .child('starred')
      .once('value')
      .then(data => {
        console.log(data.val());
        if (data.val() !== null) {
          const channelIds = Object.keys(data.val());
          console.log(channelIds);
          const prevStarred = channelIds.includes(channelId);
          this.setState({ isChannelStarred: prevStarred })
        }
      })
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  }

  addMessageListener = channelId => {
    let loadedMessages = [];
    const ref = this.getMessagesRef();
    ref.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
      this.countUniqueUsers(loadedMessages);
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

  displayChannelName = channel => {
    return channel ? `${this.state.privateChannel ? '@' : '#'}${channel.name}` : "";
  }

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const multiple = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${multiple ? 's' : ''}`;
    this.setState({ numUniqueUsers })
  }

  getMessagesRef = () => {
    const { messagesRef, privateMessagesRef, privateChannel } = this.state;
    return privateChannel ? privateMessagesRef : messagesRef;
  }

  handleStar = () => {
    this.setState(prevState => ({ isChannelStarred: !prevState.isChannelStarred }), () => this.starChannel())
  }

  starChannel = () => {
    if (this.state.isChannelStarred) {
      this.state.usersRef
        .child(`${this.state.currentUser.uid}/starred`)
        .update({ [this.state.channel.id]: { name: this.state.channel.name, details: this.state.channel.details, createdBy: { name: this.state.channel.createdBy.name, avatar: this.state.channel.createdBy.avatar } } })
      console.log("star")
    } else {
      this.state.usersRef
        .child(`${this.state.currentUser.uid}/starred`)
        .child(this.state.channel.id).remove(err => {
          if (err !== null) { console.error(err) }
        })
      console.log("unstar")
    }
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value,
      searchLoading: true
    }, () => this.handleSearchMessages());
  }

  handleSearchMessages = () => {
    // spreading to make sure not to mutate the state messages
    const channelMessages = [...this.state.messages];
    const userSearch = this.state.searchTerm.trim()[0] === '@';
    const searchTerm = userSearch ? this.state.searchTerm.trim().substring(1) : this.state.searchTerm;
    const regex = new RegExp(searchTerm, 'gi');
    const searchResults = channelMessages.reduce((acc, message) => {
      if (userSearch && message.user.name.match(regex)) {
        acc.push(message)
      }
      if (!userSearch && (message.content && message.content.match(regex))) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
  }

  render() {
    const { messagesRef, channel, messages, currentUser, progressBar, numUniqueUsers, searchResults, searchTerm, searchLoading, privateChannel, isChannelStarred } = this.state;

    return (
      <Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(channel)}
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
          searchLoading={searchLoading}
          handleStar={this.handleStar}
          isChannelStarred={isChannelStarred}
          isPrivateChannel={privateChannel} />

        <Segment>
          <Comment.Group className={progressBar ? "messages__progress" : "messages"}>
            {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={currentUser}
          isProgressBarVisible={this.isProgressBarVisible}
          isPrivateChannel={privateChannel}
          getMessagesRef={this.getMessagesRef} />
      </Fragment>
    )
  }
}

export default Messages
