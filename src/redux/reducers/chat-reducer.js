import { UPDATE_COUNT } from '../actions/chat-action'

const init = 0
export default function reducer(state = init, action) {
    switch (action.type) {
        case UPDATE_COUNT:
            return action.payload
        default:
            return state
    }
}