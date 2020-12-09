import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentChannel, setPrivateChannel } from '../../actions/channels';
import { Menu, Icon } from 'semantic-ui-react';
import firebase from '../../firebase';


// stateful component
class Starred extends Component {
  state = {
    currentUser: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    activeChannel: '',
    starredChannels: []
  }

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id })
  }

  componentDidMount() {
    console.log(this.state);
    if (this.state.currentUser) { this.addListener(this.state.currentUser.uid) };
  }

  addListener = userId => {
    this.state.usersRef
      .child(userId)
      .child('starred')
      .on('child_added', snap => {
        const starredChannel = { id: snap.key, ...snap.val() };
        this.setState({
          starredChannels: [...this.state.starredChannels, starredChannel]
        })
      });

    this.state.usersRef
      .child(userId)
      .child('starred')
      .on('child_removed', snap => {
        const channelToRemove = { id: snap.key, ...snap.val() };
        const filteredChannels = this.state.starredChannels.filter(channel => {
          return channel.id !== channelToRemove.id;
        });
        this.setState({ starredChannels: filteredChannels })
      })
  }

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
    this.setState({ channel })
  }

  displayChannels = starredChannels => (
    starredChannels.length > 0 && starredChannels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        active={channel.id === this.state.activeChannel}>
        # {channel.name}
      </Menu.Item>

    ))
  )

  render() {
    const { starredChannels } = this.state;
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="star" /> STARRED
          </span>{"  "}
          ({starredChannels.length})
        </Menu.Item>
        {this.displayChannels(starredChannels)}
      </Menu.Menu>
    )
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred)