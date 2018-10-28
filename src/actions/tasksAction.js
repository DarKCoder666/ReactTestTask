import { LOAD_LIST } from './types'
import axios from 'axios'
import config from '../config'

export const loadTasks = (page = 0) => (dispatch, getState) => {
    const state = getState();

    if(state[page]) { return }
    console.log(state);

    axios.get(config.reqUrl, { 
            params: {developer: config.devName},
            page
        })
        .then((res) => {
            if(res.data.status === "ok") {
                dispatch({
                    type: LOAD_LIST,
                    payload: { data: res.data.message, page }
                });
            }
        });

    // dispatch({ 
    //     type: MEDIA_LOADED
    // });
}