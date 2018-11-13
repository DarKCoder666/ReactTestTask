import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardSubtitle,
    Row, Col,
    Button, Form, FormGroup, Label, Input,
    Badge
} from 'reactstrap'

export default class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            godMod: false
        };

        this.editHandler = this.editHandler.bind(this);
    }

    /**
     * Handles the task edit form submit
     * @param {Object} e 
     */
    editHandler(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        this.props.editTask({
            text: formData.get('text'),
            status: parseInt(formData.get('status'))
        }, this.props.el.id);

        this.setState({
            godMod: false
        })
    }

    render() {
        const el = this.props.el;

        // If the task not in edit state, he will see this template
        const viewMod = (
            <CardBody>
                <CardSubtitle>User Name: {el.username}</CardSubtitle>
                <br />
                <CardSubtitle>Email: {el.email}</CardSubtitle>
                <br />
                {(el.status === 10) ? ( <Badge color="success">Done</Badge>)
                    : (<Badge color="danger">Not Done Yet</Badge>)}
                <CardText>Task: {el.text}</CardText>

                {(this.props.auth && this.props.auth.loggedIn) && (
                    <Button onClick={() => { this.setState({ godMod: !this.state.godMod }) }}>Edit</Button>
                )}
            </CardBody>
        );
        
        // If user clicked at edit button, he will see this from
        const godModForm = (
            <Form onSubmit={this.editHandler}>
                <FormGroup>
                    <Label for="status">Status</Label>
                    <Input type="select" name="status" defaultValue={el.status} id="status">
                        <option value={10}>Done</option>
                        <option value={0}>Not Done</option>
                    </Input>
                </FormGroup>

                <Input type="textarea" name="text" defaultValue={el.text} />

                <Button style={{ margin: '15px 0' }}>Save</Button>
            </Form>
        );

        return (
            <Card style={{ margin: "40px auto" }}>
                <Row>
                    <Col xs="12" sm="4">
                        <CardImg top width="100%" src={el.image_path} alt="Card image cap" />
                    </Col>
                    <Col xs="12" sm="8">
                        {/* Decides whether it which template to show */}
                        {!this.state.godMod ? (viewMod) : (godModForm)}

                    </Col>
                </Row>
            </Card>
        )
    }
}
