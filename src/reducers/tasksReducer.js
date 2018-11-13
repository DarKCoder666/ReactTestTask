import { 
    LOAD_LIST, 
    UPDATE_TASK, 
    TOGGLE_PREVIEW_VISIBILITY, 
    PREVIEW_INPUT_CHANGE,
    UPDATE_FILTER
} from '../actions/types'

import config from '../config'

const filterDelConf = config.filter.default;

const initialState = {
    tasks: {
        currentTasks: [],
        amountOfTasks: 0,
        tasksPerPage: config.tasks.perPage,
        preview: {
            inputs: {
                username: "",
                email: "",
                text: ""
            },
            canShow: false
        }
    },
    filter: {
        filter: filterDelConf.sort,
        direction: filterDelConf.direction,
        page: filterDelConf.page
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_LIST:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    currentTasks: [
                        ...action.payload.data.tasks
                    ],
                    amountOfTasks: action.payload.data.total_task_count,
                },
                filter: {
                    ...state.filter,
                    page: action.payload.page
                },
            }
        case UPDATE_TASK:
            let tempState = Object.assign({}, state);
            tempState.tasks.currentTasks = tempState.tasks.currentTasks.map((el) => {
                if (el.id === action.payload.id) {
                    return Object.assign({}, el, action.payload.data);
                }
                return el;
            });
            return tempState;
        case TOGGLE_PREVIEW_VISIBILITY:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    preview: {
                        ...state.tasks.preview,
                        canShow: !state.tasks.preview.canShow
                    }
                }
            };
        case PREVIEW_INPUT_CHANGE:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    preview: {
                        ...state.tasks.preview,
                        inputs: {
                            ...state.tasks.preview.inputs,
                            [action.payload.name]: action.payload.value
                        }
                    }
                }
            }
        case UPDATE_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.payload
                }
            }
        default:
            return state;
    }
}