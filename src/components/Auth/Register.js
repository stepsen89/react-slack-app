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
    loading: false,
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "password is not valid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}> {error.message} </p>);

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else return true;
  };

  isFormEmpty = ({ email, username, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          this.setState({ loading: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            errors: this.state.errors.concat(error),
            loading: false,
          });
        });
    }
  };

  handleInputError = (errors, inputName) => {
    return errors.some((error) => error.message.includes(inputName))
      ? "error"
      : "";
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading,
    } = this.state;
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
                value={username}
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
                value={email}
                className={this.handleInputError(errors, "email")}
              />
              <Form.Input
                fluid
                size="big"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                className={this.handleInputError(errors, "password")}
                type="password"
                value={password}
              />
              <Form.Input
                fluid
                size="big"
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm your password"
                onChange={this.handleChange}
                className={this.handleInputError(errors, "password")}
                type="password"
                value={passwordConfirmation}
              />
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="blue"
                fluid
                size="large"
              >
                Submit
              </Button>
              {errors.length > 0 && (
                <Message error>
                  <h3> Error </h3>
                  {this.displayErrors(this.state.errors)}
                </Message>
              )}
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
