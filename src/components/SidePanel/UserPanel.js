import React, { Component } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react'

class UserPanel extends Component {
  render() {
    return (
      <Grid style={{ background: 'peacock' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* App Header */}
            <Header>
              <Icon name="code" />
              <Header.Content> DevChat </Header.Content>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

export default UserPanel
