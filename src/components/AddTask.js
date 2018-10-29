import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap'
import { addTask } from '../actions/tasksAction'
import { connect } from 'react-redux'

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

    onPreviewClick() {
        this.setState({
            preview: {
                ...this.state.preview,
                canShow: !this.state.preview.canShow
            }
        })
    }

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

function resizeImage(file, MAX_WIDTH, MAX_HEIGHT) {
    return new Promise(resolve => {
        let img = document.createElement('img');
        const reader = new FileReader();
        reader.onload = (e) => {
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                var dataurl = canvas.toDataURL("image/png");
                resolve(dataurl)
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);

    })
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}