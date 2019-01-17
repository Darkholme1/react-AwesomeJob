export const ADD_EDUEXP = 'ADD_EDUEXP'
export const UPDATE_EDUEXP = 'UPDATE_EDUEXP'
export const DELETE_EDUEXP = 'DELETE_EDUEXP'
export const addEduExp = (obj) => {
    return {
        type: ADD_EDUEXP,
        payload: obj
    }
}
export const updateEduExp = obj => {
    return {
        type: UPDATE_EDUEXP,
        payload: obj
    }
}
export const deleteEduExp = ()=>{
    return {
        type: DELETE_EDUEXP
    }
}