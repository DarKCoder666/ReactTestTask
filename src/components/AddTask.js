import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap'
import { addTask } from '../actions/tasksAction'
import { connect } from 'react-redux'

import { dataURItoBlob, resizeImage } from '../scripts/imageManipulations'

import Task from './Task'

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preview: {
                canShow: false,
                status: 0
            }
        }

        this.submitForm = this.submitForm.bind(this);
        this.onPreviewClick = this.onPreviewClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    /**
     * Activated preview window
     */
    onPreviewClick() {
        this.setState({
            preview: {
                ...this.state.preview,
                canShow: !this.state.preview.canShow
            }
        })
    }

    /**
     * Changes input values in state when input changes
     * @param {Object} e 
     */
    async onInputChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'file') {
            const file = e.target.files[0];
            name = "image_path"
            value = file ? await resizeImage(e.target.files[0]) : "";
        }

        this.setState({
            preview: {
                ...this.state.preview,
                [name]: value
            }
        })
    }
    
    /** 
     * Async function
     * Resizes image usgin config params
     * And then calls action 'addTask'
     */
    async submitForm(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        const resizedImage = await resizeImage(formData.get('file'), 320, 240);
        formData.append("image", dataURItoBlob(resizedImage));
        this.props.addTask(formData);
    }

    render() {
        return (
            <div>
                <Container>
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                            <Label for="username">Name</Label>
                            <Input type="text" name="username" id="username" placeholder="Your name" required onChange={this.onInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Your Email" required onChange={this.onInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="image">File</Label>
                            <Input type="file" name="file" id="image" accept=".png, .jpg, .jpeg .gif" required onChange={this.onInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="text">Text</Label>
                            <Input type="textarea" name="text" id="text" required onChange={this.onInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Button style={{ width: '100%' }}>Submit</Button>
                        </FormGroup>
                    </Form>

                    <FormGroup>
                        <Button style={{ width: '100%' }} onClick={this.onPreviewClick}>Preview</Button>
                    </FormGroup>

                    {this.state.preview.canShow && (
                        <div className="preview">
                            <Task el={this.state.preview} />
                        </div>
                    )}
                </Container>
            </div>

        )
    }
}


export default connect(null, { addTask })(AddTask);