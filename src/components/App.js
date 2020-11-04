import React from 'react';
import { Grid } from 'semantic-ui-react'
import './App.css';

import { connect } from 'react-redux';

import ColorPanel from './ColorPanel/ColorPanel';
import MetaPanel from './MetaPanel/MetaPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';


const App = ({ currentUser, currentChannel }) => (
  <Grid columns="equal" className="app" style={{ backgroundColor: '#eee' }}>
    <ColorPanel />
    <SidePanel currentUser={currentUser} key={currentUser && currentUser.id} />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages currentChannel={currentChannel} key={currentChannel && currentChannel.id} currentUser={currentUser} />
    </Grid.Column>
    <Grid.Column>
      <MetaPanel width={4} />
    </Grid.Column>
  </Grid >
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channels && state.channels.currentChannel
})

export default connect(mapStateToProps)(App);
