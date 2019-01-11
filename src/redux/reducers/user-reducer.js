import { ADD_USER,DELETE_USER,UPDATE_USER } from '../actions/user-action'

const init = {}

export default function reducer(state = init, action) {
    switch (action.type) {
        case ADD_USER: {
            /* return {
                ...state,
                user: action.payload
            } */
            return action.payload
            
        }
        case UPDATE_USER: {
            return {
                ...state,
                ...action.payload
            }
        }
        case DELETE_USER: {
            return init
        }
        default:
            return state
    }
}