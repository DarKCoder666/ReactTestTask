import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap'
import { addTask, togglePreviewVisibility, onPreviewInputChange } from '../actions/tasksAction'
import { connect } from 'react-redux'

import { dataURItoBlob, resizeImage } from '../scripts/imageManipulations'

import Task from './Task'

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preview: {
                canShow: false,
            }
        }

        this.submitForm = this.submitForm.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    /**
     * Changes input values in state when input changes
     * @param {Object} e 
     */
    async onInputChange(e) {

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
                            <Input type="text" name="username" id="username" 
                                   value={this.props.tasks.preview.inputs.username} 
                                   placeholder="Your name" required onChange={this.props.onPreviewInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email"
                                   value={this.props.tasks.preview.inputs.email} 
                                   placeholder="Your Email" required onChange={this.props.onPreviewInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="image">File</Label>
                            <Input type="file" name="file" id="image" accept=".png, .jpg, .jpeg .gif" 
                                onChange={this.props.onPreviewInputChange} required />
                        </FormGroup>

                        <FormGroup>
                            <Label for="text">Text</Label>
                            <Input type="textarea" name="text" id="text" required
                                   value={this.props.tasks.preview.inputs.text}
                                   onChange={this.props.onPreviewInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Button style={{ width: '100%' }}>Submit</Button>
                        </FormGroup>
                    </Form>

                    <FormGroup>
                        <Button style={{ width: '100%' }} onClick={this.props.togglePreviewVisibility}>Preview</Button>
                    </FormGroup>

                    {this.props.tasks.preview.canShow && (
                        <div className="preview">
                            <Task el={this.props.tasks.preview.inputs} />
                        </div>
                    )}
                </Container>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: { ...state.tasks.tasks }
    }
}

export default connect(mapStateToProps, { addTask, togglePreviewVisibility, onPreviewInputChange })(AddTask);