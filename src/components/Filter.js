import React, { Component } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, } from 'reactstrap'

import { connect } from 'react-redux'

import history from '../history'
import config from '../config'

import { updateFilter } from '../actions/tasksAction'


import qs from 'query-string'

class Filter extends Component {
    constructor(props) {
        super(props);

        this.filterSubmit = this.filterSubmit.bind(this);
    }

    filterSubmit(e) {
        const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

        const data = new FormData(e.target);
        const filter = data.get('filter');
        const direction = data.get('direction');

        this.props.loadTasks({
            sort: filter,
            direction: direction,
            page: params.page
        });

        history.push({
            pathname: '/',
            search: "?" + new URLSearchParams({
                filter: filter,
                direction: direction,
                page: params.page
            }).toString()
        });

        e.preventDefault();
    }

    /**
     * Loads tasks on component mount by params in url if they exists
     * othervise default params will be used
     */
    componentWillMount() {
        const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        let newParams = { ...params };

        if (!newParams.filter) {
            newParams.filter = config.filter.default.sort;
        }
        if (!newParams.direction) {
            newParams.direction = config.filter.default.direction;
        }
        if (!newParams.page) {
            newParams.page = 1;
        }

        history.push({
            pathname: '/',
            search: "?" + new URLSearchParams(newParams).toString()
        });

        this.props.updateFilter(newParams);

        this.props.loadTasks({
            ...this.props.filter,
            ...newParams
        });
    }

    render() {
        let sortElements = config.filter.sort.map((el, i) => (
            <option key={i} value={el}>{el}</option>
        ));

        let directionElements = config.filter.direction.map((el, i) => (
            <option key={i} value={el}>{el}</option>
        ));

        return (
            <div>
                <Form onSubmit={this.filterSubmit}>
                    <Row style={{ alignItems: 'flex-end', textAlign: 'left' }}>
                        <Col xs="12" sm="4">
                            <FormGroup>
                                <Label for="filter">Filter by</Label>
                                <Input type="select" defaultValue={this.props.filter.filter} name="filter" id="filter">
                                    {sortElements}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="4">
                            <FormGroup>
                                <Label for="direction">Order</Label>
                                <Input type="select" defaultValue={this.props.filter.direction} name="direction" id="direction">
                                    {directionElements}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="4">
                            <FormGroup>
                                <Button>Filter</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        filter: { ...state.tasks.tasks.filter }
    }
}

export default connect(mapStateToProps, { updateFilter })(Filter);