import { LOAD_LIST, UPDATE_TASK } from '../actions/types';

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
        case UPDATE_TASK:
            let tempState = Object.assign({}, state);
            tempState.currentTasks = tempState.currentTasks.map((el) => {
                if(el.id === action.payload.id) {
                    console.log(el, action.payload.data, Object.assign({}, el, action.payload.data));
                    return Object.assign({}, el, action.payload.data);
                }
                return el;
            });
            console.log(tempState);
            return tempState
        default:
            return state;
    }
}