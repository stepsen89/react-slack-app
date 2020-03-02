import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';

import {Link} from "react-router-dom"

export class Register extends Component {
    render() {
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="blue" textAlign="center">
                        <Icon name="signup" color="blue" />
                        Register
                    </Header>
                    <Form size="large">
                        <Segment stacked padded="very">
                            <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text"/>
                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="E-Mail Address" onChange={this.handleChange} type="email"/>
                            <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password"/>
                            <Form.Input fluid name="passwordConfirmation" icon="lock" iconPosition="left" placeholder="Confirm your password" onChange={this.handleChange} type="password"/>
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
