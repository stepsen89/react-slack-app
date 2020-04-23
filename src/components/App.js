import React from 'react';
import { Grid } from 'semantic-ui-react'
import './App.css';

import ColorPanel from './ColorPanel/ColorPanel';
import MetaPanel from './MetaPanel/MetaPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';


const App = () => (
  <Grid columns="equal" className="app" style={{ backgroundColor: '#eee' }}>
    <ColorPanel />
    <SidePanel />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>
    <Grid.Column>
      <MetaPanel width={4} />
    </Grid.Column>
  </Grid >
)

export default App;
