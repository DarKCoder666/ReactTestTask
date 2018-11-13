import React, { Component } from 'react'
import { Container } from 'reactstrap'

import { connect } from 'react-redux'
import { loadTasks, editTask } from '../actions/tasksAction' 

import Task from './Task'
import Filter from './Filter'
import Pagination from './Pagination'

class ListOfTasks extends Component {
    render() {
        let tasks = this.props.tasks.currentTasks.map((el, i) => (
            <Task editTask={this.props.editTask} auth={this.props.auth} key={i} el={el} />
        ));

        return (
            <div>
                <Container>
                    <Filter loadTasks={this.props.loadTasks}  location={this.props.location} />
                    {tasks}
                    <Pagination loadTasks={this.props.loadTasks}  location={this.props.location} tasks={this.props.tasks} />
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: { ...state.tasks.tasks },
        auth: { ...state.auth }
    }
}

export default connect(mapStateToProps, { loadTasks, editTask })(ListOfTasks);