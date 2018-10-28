import { MEDIA_LOADED } from './types';

export const loadTasks = (page) => (dispatch, getState) => {
    dispatch({
        type: MEDIA_LOADED
    })
}