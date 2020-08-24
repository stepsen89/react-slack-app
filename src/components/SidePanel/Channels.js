import React, { Component } from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions/channels';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends Component {
  state = {
    channels: [],
    openModal: false,
    channelName: null,
    channelDetails: null,
    channelsRef: firebase.database().ref('channels'),
    user: this.props.currentUser,
  }

  closeModal = () => this.setState({ openModal: false })
  openModal = () => this.setState({ openModal: true })

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  componentDidMount() {
    this.addListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels })
    })
  }

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;
    const key = channelsRef.push().key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      }
    }

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: '' });
        this.closeModal();
        console.log("channel added");
      })
      .catch(err => {
        console.log(err);
      })
  }

  displayChannels = channels => (
    channels.length > 0 && channels.map(channel => (
      <Menu.Item key={channel.id} onClick={this.changeChannel} name={channel.name}>
        # {channel.name}
      </Menu.Item>

    ))
  )

  changeChannel = channel => {
    this.props.setCurrentChannel(channel);
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
          {this.displayChannels(channels)}
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

export default connect(null, { setCurrentChannel })(Channels)
