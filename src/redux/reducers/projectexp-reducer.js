/**
 * 编辑项目经历
 */
import { ADD_PROJECTEXP } from '../actions/projectexp-action'
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
        default:
            return state
    }
}