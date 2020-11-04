import React, { Component } from 'react';
import firebase from '../../firebase';
import { Segment, Button, Input } from 'semantic-ui-react';
import FileModal from './FileModal';

class MessageForm extends Component {
  state = {
    message: '',
    loading: false,
    channel: this.props.currentChannel,
    currentUser: this.props.currentUser,
    errors: [],
    modal: false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createMessage = () => {
    const message = {
      content: this.state.message,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.currentUser.uid,
        name: this.state.currentUser.displayName,
        avatar: this.state.currentUser.photoURL
      }
    }
    return message;
  }

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel, currentUser } = this.state;
    console.log(message, channel, currentUser)
    if (message) {
      this.setState({ loading: true })
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] })
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          })
        })
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      })
    }
  }

  openModal = () => this.setState({ modal: true })
  closeModal = () => this.setState({ modal: false })

  render() {
    const { errors, message, loading, modal } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          value={message}
          onChange={this.handleChange}
          style={{ marginBottom: '0.7em' }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          className={errors.some(error => error.message.includes('message')) ? "error" : ""}
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button color="orange" content="Add reply" labelPosition="left" icon="edit" onClick={this.sendMessage} disabled={loading} />
          <Button color="teal" content="Upload media" labelPosition="right" icon="cloud upload" onClick={this.openModal} />
          <FileModal modal={modal} closeModal={this.closeModal} />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;