import { LOAD_LIST } from '../actions/types';

const initialState = {
    currentTasks: [],
    currentPage: 0,
    amountOfTasks: 0,
    tasksPerPage: 3
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_LIST:
            return {
                ...state,
                currentTasks: [
                    ...action.payload.data.tasks
                ],
                currentPage: action.payload.page,
                amountOfTasks: action.payload.data.total_task_count
            }
        default:
            return state;
    }
}