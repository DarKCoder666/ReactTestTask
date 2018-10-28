import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    Container, Row, Col
} from 'reactstrap';

export default class ListOfTasks extends Component {
    render() {
        return (
            <div>
                <Container style={{margin: "40px auto"}}>
                    <Card>
                        <Row>
                            <Col xs="12" sm="4">
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            </Col>
                            <Col xs="12" sm="8">
                                <CardBody>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                </CardBody>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        )
    }
}
