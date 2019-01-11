import { ADD_BOY, DELETE_BOY, UPDATE_BOY } from '../actions/boy-action'
const init = []
export default function reducer(state = init, action) {
    switch (action.type) {
        case ADD_BOY: {
            return [
                ...state,action.payload
            ]
        }
        case DELETE_BOY: {
            return state.filter(current=>current.name!==action.payload.name)
            
        }
        case UPDATE_BOY: {
            return state.map(current => current.name === action.payload.name ? action.payload : current)
            
        }
        default:
            return state;
    }
}