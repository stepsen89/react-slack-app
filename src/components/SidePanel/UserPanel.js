import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react'

class UserPanel extends Component {
  dropdownOptions = () = [

    {
      text: <span> Signed in as <strong>User</strong></span>,
      disabled: true
    },
    {
      text: <span> Change Avatar</span>,
      disabled: true
    }, {
      text: <span> Signed in as <strong>User</strong></span>,
      disabled: true
    },
  ]
  render() {
    return (
      <Grid style={{ background: 'peacock' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content> DevChat </Header.Content>
            </Header>
          </Grid.Row>

          <Header style={{ padding: '0.2em' }} as="h4" inverted>
            <Dropdown trigger={} options={this.dropdownOptions} />
          </Header>
        </Grid.Column>
      </Grid>
    )
  }
}

export default UserPanel
