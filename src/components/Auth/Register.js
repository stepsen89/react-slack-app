import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';

import {Link} from "react-router-dom"

export class Register extends Component {
    render() {
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Form size="big">
                        <Segment stacked padded="very">
                    <Header as="h2" color="blue" textAlign="center">
                        Sign Up
                    </Header>
                            <Form.Input fluid size="big" name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text"/>
                            <Form.Input fluid size="big" name="email" icon="mail" iconPosition="left" placeholder="E-Mail Address" onChange={this.handleChange} type="email"/>
                            <Form.Input fluid size="big" name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password"/>
                            <Form.Input fluid size="big" name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Confirm your password" onChange={this.handleChange} type="password"/>
                            <Button color="blue" fluid size="large">Submit</Button> 
                        </Segment>
                    </Form>
                    <Message> Already a user? <Link to="/login"> Login </Link> </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register
