import { CHANGE_TAB } from '../actions/tab-action'

const init = 0
export default function reducer(state = init, action) {
    switch (action.type) {
        case CHANGE_TAB:
            return action.payload
        default:
            return state
    }
}