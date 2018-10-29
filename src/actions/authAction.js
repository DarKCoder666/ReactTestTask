import { LOGIN, LOGOUT } from './types'

import history from '../history'
import config from '../config'

export const login = (data) => (dispatch) => {
    if(data.username === config.auth.username && data.password === config.auth.password) {
        dispatch({
            type: LOGIN,
            payload: {
                username: data.username
            }
        });

        history.push('/');
    } else {
        alert('Login or password is incorrect! Try again.');
    }
}

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT
    });

    history.push('/');
}