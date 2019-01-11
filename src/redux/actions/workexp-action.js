export const ADD_WORKEXP = 'ADD_WORKEXP'
export const UPDATE_WORKEXP = 'UPDATE_WORKEXP'
export const DELETE_WORKEXP = 'DELETE_WORKEXP'
export const addWorkexp = (obj) => {
    return {
        type: ADD_WORKEXP,
        payload: obj
    }
}
export const updateWorkexp = obj => {
    return {
        type: UPDATE_WORKEXP,
        payload: obj
    }
}
export const deleteWorkexp = ()=>{
    return {
        type: DELETE_WORKEXP
    }
}