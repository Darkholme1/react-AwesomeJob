/**
 * 编辑工作经历
 */
import { ADD_WORKEXP, UPDATE_WORKEXP, DELETE_WORKEXP } from '../actions/workexp-action'
const init = {
    company: '',
    start: '',
    end: '',
    position: '',
    department: '',
    job_content: '',
    job_performance: ''
}
export default function reducer(state = init, action) {
    switch (action.type) {
        case ADD_WORKEXP: {
            return action.payload
        }
        case UPDATE_WORKEXP: {
            return {
                ...state,
                ...action.payload
            }
        }
        case DELETE_WORKEXP: {
            return init
        }
        default:
            return state
    }
}