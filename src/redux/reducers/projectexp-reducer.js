/**
 * 编辑项目经历
 */
import { ADD_PROJECTEXP, UPDATE_PROJECTEXP, DELETE_PROJECTEXP } from '../actions/projectexp-action'
const init = {
    project_name: '',
    charactor: '',
    start: '',
    end: '',
    project_content: '',
    project_performance: '',
    link: ''
}
export default function reducer(state = init, action) {
    switch (action.type) {
        case ADD_PROJECTEXP: {
            return action.payload
        }
        case UPDATE_PROJECTEXP: {
            return {
                ...state,
                ...action.payload
            }
        }
        case DELETE_PROJECTEXP: {
            return init
        }
        default:
            return state
    }
}