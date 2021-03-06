import React from 'react';
import { Grid } from 'semantic-ui-react'
import './App.css';

import { connect } from 'react-redux';

import ColorPanel from './ColorPanel/ColorPanel';
import MetaPanel from './MetaPanel/MetaPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';


const App = ({ currentUser, currentChannel, isPrivateChannel }) => (
  <Grid columns="equal" className="app" style={{ backgroundColor: '#eee' }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} key={currentUser && currentUser.id} />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        currentChannel={currentChannel}
        key={currentChannel && currentChannel.id}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel} />
    </Grid.Column>
    <Grid.Column width={4} >
      <MetaPanel key={currentChannel && currentChannel.id} isPrivateChannel={isPrivateChannel} />
    </Grid.Column>
  </Grid >
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channels && state.channels.currentChannel,
  isPrivateChannel: state.channels && state.channels.isPrivateChannel
})

export default connect(mapStateToProps)(App);
