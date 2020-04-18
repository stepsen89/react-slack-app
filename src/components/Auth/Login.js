import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";

import { Link } from "react-router-dom";

import firebase from "../../firebase";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}> {error.message} </p>);

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
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
    const { email, password, errors, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to DevChat
          </Header>
          <Form size="big" onSubmit={this.handleSubmit}>
            <Segment stacked padded="very">
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
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
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
            Don't have an account? <Link to="/register"> Register </Link>{" "}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
