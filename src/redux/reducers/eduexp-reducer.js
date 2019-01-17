import { ADD_EDUEXP, UPDATE_EDUEXP, DELETE_EDUEXP } from '../actions/eduexp-action'
const init = {
    edu_bg: '',
    school: '',
    major: '',
    edu_time: '',
    school_exp: ''
}
export default function reducer(state = init, action) {
    switch (action.type) {
        case ADD_EDUEXP: {
            return action.payload
        }
        case UPDATE_EDUEXP: {
            return {
                ...state,
                ...action.payload
            }
        }
        case DELETE_EDUEXP: {
            return init
        }
        default:
            return state
    }
}