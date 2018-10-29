import { LOGIN, LOGOUT } from '../actions/types';

const initialState = {
    loggedIn: false,
    username: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                username: action.payload.username
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                username: ''
            }
        default:
            return state;
    }
}