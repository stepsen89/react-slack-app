import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
} from "semantic-ui-react";

import { Link } from "react-router-dom";

import firebase from "../../firebase";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      console.log("tests");
      error = { message: "fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "password is not valid" };
      this.setState({ errors: errors.concat(error) });
      console.log(this.state);
      return false;
    } else {
      return true;
    }
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) return false;
    else if (password !== passwordConfirmation) return false;
    else return true;
  };

  isFormEmpty = ({ email, username, password, passwordConfirmation }) => {
    console.log(
      !username.length ||
        !email.length ||
        !password.length ||
        !passwordConfirmation.length
    );
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  handleSubmit = (e) => {
    if (this.isFormValid()) {
      e.preventDefault();

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => console.log(createdUser))
        .catch((err) => console.error(err));
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Form size="big" onSubmit={this.handleSubmit}>
            <Segment stacked padded="very">
              <Header as="h2" color="blue" textAlign="center">
                Sign Up
              </Header>
              <Form.Input
                fluid
                size="big"
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                size="big"
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="E-Mail Address"
                onChange={this.handleChange}
                type="email"
              />
              <Form.Input
                fluid
                size="big"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
              />
              <Form.Input
                fluid
                size="big"
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm your password"
                onChange={this.handleChange}
                type="password"
              />
              <Button color="blue" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            {" "}
            Already a user? <Link to="/login"> Login </Link>{" "}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
