export const ADD_GIRL = 'ADD_GIRL'

export function addGirl(name,say){
    return {
        type: ADD_GIRL,
        payload: {
            name,
            say
        }
    }
}