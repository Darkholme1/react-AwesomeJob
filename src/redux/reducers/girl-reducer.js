import { ADD_GIRL } from '../actions/girl-action'
const init = {
    girls: []
}
export default function reducer(state = init, action) {
    switch (action.type) {
        case ADD_GIRL: {
            return {
                ...state,
                girls: [
                    ...state.girls, action.payload
                ]
            }
        }
        default:
            return state;
    }
}