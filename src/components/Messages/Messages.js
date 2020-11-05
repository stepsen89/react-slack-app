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
    progressBar: false,
    numUniqueUsers: '',
    searchTerm: '',
    searchLoading: false,
    searchResults: []
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

  displayChannelName = channel => channel ? `${channel.name}` : "";

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
    const { messagesRef, channel, messages, currentUser, progressBar, numUniqueUsers, searchResults, searchTerm, searchLoading } = this.state;

    return (
      <Fragment>
        <MessagesHeader channelName={this.displayChannelName(channel)} numUniqueUsers={numUniqueUsers} handleSearchChange={this.handleSearchChange} searchLoading={searchLoading} />
        <Segment>
          <Comment.Group className={progressBar ? "messages__progress" : "messages"}>
            {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm messagesRef={messagesRef} currentChannel={channel} currentUser={currentUser} isProgressBarVisible={this.isProgressBarVisible} />
      </Fragment>
    )
  }
}

export default Messages
