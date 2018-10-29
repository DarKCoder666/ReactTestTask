import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'

import history from '../history'
import qs from 'query-string'


export default class Pagination extends Component {
    constructor(props) {
        super(props);

        this.pageChange = this.pageChange.bind(this);
    }

    /**
     * Triggers when any button on pagination line pressed
     * Changes current page, and trigger load tasks action
     * @param {Object} e 
     */
    pageChange(e) {
        const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

        this.props.loadTasks({
            sort: params.filter,
            direction: params.direction,
            page: e.selected + 1
        });

        history.push({
            pathname: '/',
            search: "?" + new URLSearchParams({
                sort: params.filter,
                direction: params.direction,
                page: e.selected + 1
            }).toString()
        });
    }

    render() {
        return (
            <div>
                <ReactPaginate previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={Math.ceil(this.props.tasks.amountOfTasks / 3)}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={this.props.tasks.tasksPerPage}
                    breakClassName={"break-me"}
                    onPageChange={this.pageChange}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        )
    }
}
