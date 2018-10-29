import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap'
import { connect } from 'react-redux'

import { login } from '../actions/authAction'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.loginSubmit = this.loginSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    loginSubmit(e) {
        e.preventDefault();

        this.props.login({ username: this.state.username, password: this.state.password });

        this.setState({
            username: '',
            password: ''
        });
    }

    onInputChange(e) {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <Form onSubmit={this.loginSubmit}>
                        <FormGroup>
                            <Label for="username">Name</Label>
                            <Input onChange={this.onInputChange} type="text" name="username" id="username" placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input onChange={this.onInputChange} type="password" name="password" id="password" placeholder="password" />
                        </FormGroup>

                        <FormGroup>
                            <Button>Login</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default connect(null, { login })(Login);