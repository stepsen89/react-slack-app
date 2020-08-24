import React, { Component } from 'react';
import firebase from '../../firebase'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends Component {
  state = {
    channels: [],
    openModal: false,
    channelName: null,
    channelDetails: null,
    channelsRef: firebase.database().ref('channels')
  }

  closeModal = () => this.setState({ openModal: false })
  openModal = () => this.setState({ openModal: true })

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  addChannel = () => {

  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  }

  isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;

  render() {
    const { channels, openModal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
          </span>{"  "}
           ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
        </Menu.Menu>
        <Modal open={openModal} basic onClose={this.closeModal}>
          <Modal.Header> Add a channel </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input fluid label="Name of Channel" name="channelName" onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <Input fluid label="Details of Channel" name="channelDetails" onChange={this.handleChange} />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}> <Icon name="checkmark" /> Add </Button>
            <Button color="red" inverted> <Icon name="remove" /> Cancel </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Channels
