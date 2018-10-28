import { LOAD_LIST } from '../actions/types';

const initialState = {
    tasks: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_LIST:
            return {
                ...state
            }
        default:
            return state;
    }
}