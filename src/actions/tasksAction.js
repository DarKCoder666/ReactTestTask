import { LOAD_LIST, UPDATE_TASK } from './types'
import axios from 'axios'
import config from '../config'

/**
 * Encoding functions
 */
import md5 from '../scripts/md5'
import rfc3986 from '../scripts/rfc3986';

/**
 * Default values of params 'sort' and 'direction'
 * Used in loadTasks action as default values
 */
const { sort, direction } = config.filter.default;

/**
 * Load tasks by params to the store
 * 
 * @param {Object} params       Sorting params 
 * @param {String} sort         May have next props: "id", "email", "username", "status"
 * @param {String} direction    May have next props "asc", "desc"
 * @param {Number} page         Page of the loading tasks
 * 
 * @return {Void}
 */

export const loadTasks = (params = { sort, direction, page: 0 }) => (dispatch) => {
    axios.get(config.reqUrl, {
        params: {
            developer: config.devName,
            page: params.page,
            sort_field: params.sort,
            sort_direction: params.direction
        },
    })
        .then((res) => {
            console.log(res);
            if (res.data.status === "ok") {
                dispatch({
                    type: LOAD_LIST,
                    payload: { data: res.data.message, page: params.page }
                });
            }
        });
}

/**
 * Add the Task
 * 
 * @param {FormData} formData Task data
 * @return {Void}
 */
export const addTask = (formData) => (dispatch) => {
    const params = {
        developer: config.devName,
    };

    axios.post(config.reqUrl + "create", formData, {
        params
    })
        .then(res => {
            loadTasks();
            alert("Task loaded!");
        });
}

/**
 * Edit task by ID
 * 
 * @param {Object} unorderedData    Task new values 
 * @param {*} id                    Task ID
 * 
 * @return {Void}
 */
export const editTask = (unorderedData, id) => (dispatch) => {
    let params = {
        developer: config.devName
    },
    formData = new FormData();

    // Order the data in object
    let orderedData = {};
    Object.keys(unorderedData).sort().forEach(function (key) {
        orderedData[key] = unorderedData[key];
    });

    // Requested from the backend
    orderedData.token = 'beejee';

    // Encode object's keys and values using RFC-3986
    let encodedObject = {};
    for (let prop in orderedData) {
        encodedObject[rfc3986(prop)] = rfc3986(orderedData[prop]);
    }

    // Stick all keys and values of the encoded Object into one string,
    // doing some manipulations
    let encodedString = "";
    for (let prop in encodedObject) {
        if (encodedString !== "") {
            encodedString += "&";
        }

        encodedString += `${prop}=${encodedObject[prop]}`
    }

    // Finally encode string using md5 algorithm
    encodedString = md5(encodedString);

    // Set as a body param signature just encoded string
    orderedData.signature = encodedString;

    // Preparing data to send to the server. 
    // Set each param into FormData.
    for(let prop in orderedData) {
        formData.append(prop, orderedData[prop]);
    }

    // Send the request
    // If it is ok, load tasks for the current page with current filter params
    axios.post(config.reqUrl + "edit/" + id + "/", formData, {
        params
    })
        .then(res => {
            dispatch({
                type: UPDATE_TASK,
                payload: {
                    data: unorderedData,
                    id: id
                }
            });
            alert("Task edited!");
        });
}