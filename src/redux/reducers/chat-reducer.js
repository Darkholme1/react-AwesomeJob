import { MSG_LIST } from '../actions/chat-action'

const init = {
    chatMsg: [],
    unRead: 0
}
export default function reducer(state = init, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                chatMsg: action.payload,
                unRead: action.payload.filter(v => !v.read).length //未读数量
            }
        default:
            return state
    }
}